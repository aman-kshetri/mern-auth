# Authentication Test Cases

## 1. Registration

### TC-REG-001 — Successful registration
**Priority:** High

**Precondition:**
- Application is running
- Email does not already exist

**Steps:**
1. Open the registration page.
2. Enter a valid name.
3. Enter a unique valid email.
4. Enter a valid password.
5. Submit the form.

**Expected Result:**
- Registration succeeds.
- Success message is displayed.
- User is created in the database.

---

### TC-REG-002 — Registration without name
**Priority:** High

**Steps:**
1. Open registration.
2. Leave name empty.
3. Enter valid email and password.
4. Submit.

**Expected Result:**
- Registration fails.
- "Missing details" message is displayed.
- User is not created.

---

### TC-REG-003 — Registration without email
**Priority:** High

**Expected Result:**
- Registration fails.
- "Missing details" message is displayed.

---

### TC-REG-004 — Registration without password
**Priority:** High

**Expected Result:**
- Registration fails.
- "Missing details" message is displayed.

---

### TC-REG-005 — Duplicate email registration
**Priority:** High

**Steps:**
1. Register a user with a valid email.
2. Try registering another user with the same email.

**Expected Result:**
- Second registration fails.
- Appropriate error message is displayed.
- Duplicate user is not created.

---

## 2. Login

### TC-LOGIN-001 — Successful login
**Priority:** Critical

**Expected Result:**
- Login succeeds.
- Authentication cookie is created.
- User is redirected to the authenticated area.

---

### TC-LOGIN-002 — Login with incorrect password
**Priority:** Critical

**Expected Result:**
- Login fails.
- Appropriate error message is displayed.
- User is not authenticated.

---

### TC-LOGIN-003 — Login with unregistered email
**Priority:** High

**Expected Result:**
- Login fails.
- Appropriate error message is displayed.

---

### TC-LOGIN-004 — Login with empty email
**Priority:** High

**Expected Result:**
- Login fails.
- Appropriate validation/error message is displayed.

---

### TC-LOGIN-005 — Login with empty password
**Priority:** High

**Expected Result:**
- Login fails.
- Appropriate validation/error message is displayed.

---

## 3. Logout

### TC-LOGOUT-001 — Successful logout
**Priority:** Critical

**Steps:**
1. Login successfully.
2. Click logout.

**Expected Result:**
- User is logged out.
- Authentication session is removed.
- Protected resources can no longer be accessed.

---

## 4. Forgot Password

### TC-FORGOT-001 — Request password reset with registered email
**Priority:** High

**Expected Result:**
- Reset OTP is generated.
- Reset email is sent.
- User can continue to the reset-password process.

---

### TC-FORGOT-002 — Request password reset with unregistered email
**Priority:** High

**Expected Result:**
- Password reset does not proceed.
- Appropriate error message is displayed.

---

## 5. Password Reset

### TC-RESET-001 — Successful password reset
**Priority:** Critical

**Expected Result:**
- Password is changed.
- User can log in using the new password.

---

### TC-RESET-002 — Invalid OTP
**Priority:** High

**Expected Result:**
- Password is not changed.
- Appropriate error message is displayed.

---

### TC-RESET-003 — Expired OTP
**Priority:** High

**Expected Result:**
- Password reset fails.
- Password remains unchanged.

---

## 6. Authentication / Protected Routes

### TC-AUTH-001 — Authenticated user can access protected resource
**Priority:** Critical

**Expected Result:**
- Authenticated request succeeds.

---

### TC-AUTH-002 — Unauthenticated user cannot access protected resource
**Priority:** Critical

**Expected Result:**
- Request is rejected.
- User is not given protected data.

---

### TC-AUTH-003 — Logout invalidates authenticated session
**Priority:** Critical

**Steps:**
1. Login.
2. Access protected endpoint.
3. Logout.
4. Try accessing the protected endpoint again.

**Expected Result:**
- First request succeeds.
- Request after logout is rejected.