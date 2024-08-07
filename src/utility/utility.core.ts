import { randomBytes } from 'crypto';
import { ApiBaseResponse, ApiResponsePaginated } from 'src/core/interfaces/api-response.interface';

const generateRandomString = (length: number): string => {
  return randomBytes(length).toString('hex');
};

const parseBoolean = (value: string | boolean): boolean => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
};

function createApiResponse<T>(message: string, data?: T): ApiBaseResponse<T> {
  return { message, data };
}

function createApiResponsePaginated<T>(
  message: string,
  data: T,
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
): ApiResponsePaginated<T> {
  return { message, data, meta };
}


export { generateRandomString, parseBoolean, createApiResponse, createApiResponsePaginated };
