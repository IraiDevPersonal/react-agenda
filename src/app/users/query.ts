import type { UseQueryOptions } from "@tanstack/react-query";
import type { Values } from "nuqs";

import { queryOptions } from "@tanstack/react-query";

import type { TQueryKey } from "@/lib/types/global-types";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { queryParser } from "@/lib/utils";

import type { UserFilters } from "./models/types";
import type { UserDetailResponseModel } from "./models/user-detail-response-model";
import type { UserForFilterModel } from "./models/user-for-filters-model";
import type { UserResponseModel } from "./models/user-response-model";
import type { UserServiceImpl } from "./service";

type Filters = Values<UserFilters>;

type UserQueryImpl = {
  list: (filters: Filters) => UseQueryOptions<
    UserResponseModel,
    Error,
    UserResponseModel,
    TQueryKey
  >;
  pagination: (filters: Filters) => UseQueryOptions<
    UserResponseModel,
    Error,
    Omit<UserResponseModel, "data">,
    TQueryKey
  >;
  total: (filters: Filters) => UseQueryOptions<
    UserResponseModel,
    Error,
    number,
    TQueryKey
  >;
  forLoader: (filters: Filters) => UseQueryOptions<
    UserResponseModel,
    Error,
    null,
    TQueryKey
  >;
  detail: (uid: string) => UseQueryOptions<
    UserDetailResponseModel,
    Error,
    UserDetailResponseModel,
    TQueryKey
  >;
  forFilters: () => UseQueryOptions<
    UserForFilterModel[],
    Error,
    UserForFilterModel[],
    TQueryKey
  >;
};

export class UserQuery implements UserQueryImpl {
  private readonly service: UserServiceImpl;

  constructor(service: UserServiceImpl) {
    this.service = service;
  }

  private defaultListOptions = (filters: Filters) => {
    return queryOptions({
      queryKey: [QUERY_KEYS.users, filters] as TQueryKey,
      queryFn: () => this.service.getUsers(queryParser(filters)),
    });
  };

  list = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      staleTime({ state }) {
        const data = state.data as UserResponseModel | undefined;
        return (data?.total ?? 0) > 0 ? (1 * 60 * 1000) : 0;
      },
    });
  };

  pagination = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      select: (data) => {
        return {
          total: data.total,
          limit: data.limit,
          page: data.page,
          pages: data.pages,
        };
      },
      throwOnError: false,
    });
  };

  total = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      select: data => data.total,
      throwOnError: false,
    });
  };

  forLoader = (filters: Filters) => {
    return queryOptions({
      ...this.defaultListOptions(filters),
      select: () => null,
      throwOnError: false,
    });
  };

  detail = (uid: string) => {
    return queryOptions({
      queryKey: [QUERY_KEYS.users, QUERY_KEYS.generic.detail, uid] as TQueryKey,
      queryFn: () => this.service.getUserByUid(uid),
      refetchOnWindowFocus: false,
      throwOnError: false,
      retry: 0,
    });
  };

  forFilters = () => {
    return queryOptions({
      refetchOnWindowFocus: false,
      queryKey: [QUERY_KEYS.users, "for-filter"] as TQueryKey,
      queryFn: () => this.service.getUsersForFilters(),
    });
  };
}
