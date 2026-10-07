import { APIRequestContext } from '@playwright/test';

export class APIClient {
  readonly request: APIRequestContext;
  readonly apiUrl: string;

  constructor(request: APIRequestContext, apiUrl: string) {
    this.request = request;
    this.apiUrl = apiUrl;
  }

  async Register(
    name: string,
    email: string,
    password: string
  ) {
    return this.request.post(
      `${this.apiUrl}/api/auth/register`,
      {
        data: {
          name,
          email,
          password,
        },
      }
    );
  }

  async Login(
    email: string,
    password: string
  ) {
    return this.request.post(
      `${this.apiUrl}/api/auth/login`,
      {
        data: {
          email,
          password,
        },
      }
    );
  }

  async Logout() {
    return this.request.post(
      `${this.apiUrl}/api/auth/logout`
    );
  }

  async IsAuthenticated() {
    return this.request.get(
      `${this.apiUrl}/api/auth/is-auth`
    );
  }

  async SendVerificationOtp() {
    return this.request.post(
      `${this.apiUrl}/api/auth/send-verify-otp`
    );
  }

  async VerifyEmail(otp: string) {
    return this.request.post(
      `${this.apiUrl}/api/auth/verify-account`,
      {
        data: {
          otp,
        },
      }
    );
  }

  async SendResetOtp(email: string) {
    return this.request.post(
      `${this.apiUrl}/api/auth/send-reset-otp`,
      {
        data: {
          email,
        },
      }
    );
  }

  async ResetPassword(
    email: string,
    otp: string,
    newPassword: string
  ) {
    return this.request.post(
      `${this.apiUrl}/api/auth/reset-password`,
      {
        data: {
          email,
          otp,
          newPassword,
        },
      }
    );
  }
}