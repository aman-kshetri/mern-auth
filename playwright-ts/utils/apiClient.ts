import { APIRequestContext, expect } from "@playwright/test";

export class APIClient {
  readonly request: APIRequestContext;
  readonly apiUrl: string;

  constructor(request: APIRequestContext, apiUrl: string) {
    this.request = request;
    this.apiUrl = process.env.API_URL || "http://localhost:4000";
  }

  async Register(name: string, email: string, password: string) {
    return this.request.post(`${this.apiUrl}/api/auth/register`, {
      data: {
        name,
        email,
        password,
      },
    });
  }

  async Login(email: string, password: string) {
    return this.request.post(`${this.apiUrl}/api/auth/login`, {
      data: {
        email,
        password,
      },
    });
  }

  async logout() {
    return this.request.post(`${this.apiUrl}/api/auth/logout`);
  }

  async isAuthenticated() {
    return this.request.get(`${this.apiUrl}/api/auth/is-auth`);
  }

  async sendVerificationOtp() {
    return this.request.post(`${this.apiUrl}/api/auth/send-verify-otp`);
  }

  async verifyEmail(otp: string) {
    return this.request.post(`${this.apiUrl}/api/auth/verify-account`, {
      data: {
        otp,
      },
    });
  }

  async sendResetOtp(email: string) {
    return this.request.post(`${this.apiUrl}/api/auth/send-reset-otp`, {
      data: {
        email,
      },
    });
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    return this.request.post(`${this.apiUrl}/api/auth/reset-password`, {
      data: {
        email,
        otp,
        newPassword,
      },
    });
  }
}
