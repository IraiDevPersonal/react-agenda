import { isAxiosError } from "axios";
import { ZodError } from "zod";

export class CustomError extends Error {
  constructor(
    public readonly message: string,
  ) {
    super(message);
  }

  static handleError = (error: unknown, options?: { showLog: boolean }) => {
    const { message, stack } = this.getError(error);

    if (options?.showLog) {
      console.error(`CustomError: ${message}`, { stack });
    }

    throw new CustomError(message);
  };

  static getError(error: unknown): { message: string; stack?: string } {
    const errorMessage = this.getErrorMessage(error);

    if (error instanceof Error) {
      return { message: errorMessage, stack: error.stack };
    }

    return { message: errorMessage, stack: undefined };
  }

  private static getErrorMessage(error: unknown) {
    if (error instanceof CustomError) {
      return error.message;
    }

    if (isAxiosError<{ error: string }>(error)) {
      if (error.response) {
        return error.response.data?.error ?? "Error de respuesta desconocida...";
      }
      if (error.request) {
        return "No se recibió respuesta del servidor...";
      }
      return error.message;
    }

    if (error instanceof ZodError) {
      const issues = error.issues.map(
        // issue => `[${issue.path.join(".")}] ${issue.message}`,
        issue => `${issue.message}`,
      );
      return issues.join("; \n");
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Error desconocido...";
  }
}
