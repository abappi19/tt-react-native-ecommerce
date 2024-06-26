import { jwtDecode } from "jwt-decode";
import { TokenDataSchema } from "../schema/token-data.schema";

export const useJWTParser = <T>({ token }: { token: string | null }): T => {
  if (!token) return {} as T;
  const parsedData: T = jwtDecode(token);
  return parsedData;
};
