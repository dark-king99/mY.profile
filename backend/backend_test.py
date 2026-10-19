"""
Backend API Testing for Portfolio Website
Tests all endpoints using the public URL
"""
import requests
import sys
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url="https://devops-fullstack-pro.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_message_id = None
        self.inbox_token = None

    def run_test(self, name, method, endpoint, expected_status, data=None, check_response=None, auth_token=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Add Bearer token if provided
        if auth_token:
            headers['Authorization'] = f'Bearer {auth_token}'

        self.tests_run += 1
        print(f"\n🔍 Test {self.tests_run}: {name}")
        print(f"   URL: {url}")
        if auth_token:
            print(f"   Auth: Bearer token provided")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                print(f"❌ Failed - Unsupported method {method}")
                return False, {}

            print(f"   Status: {response.status_code} (expected {expected_status})")
            
            success = response.status_code == expected_status
            
            # Additional response checks
            if success and check_response:
                try:
                    response_data = response.json() if response.status_code != 204 else {}
                    check_result = check_response(response_data)
                    if not check_result:
                        success = False
                        print(f"   ⚠️  Response validation failed")
                except Exception as e:
                    success = False
                    print(f"   ⚠️  Response check error: {str(e)}")

            if success:
                self.tests_passed += 1
                print(f"✅ PASSED")
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}")

            return success, response.json() if response.status_code not in [204, 500] and response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ FAILED - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ FAILED - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ FAILED - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/ returns running message"""
        success, response = self.run_test(
            "Root endpoint - GET /api/",
            "GET",
            "/",
            200,
            check_response=lambda r: "message" in r and "running" in r.get("message", "").lower()
        )
        if success:
            print(f"   ✓ Message: {response.get('message')}")
        return success

    def test_create_valid_contact(self):
        """Test POST /api/contact with valid data"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "This is a test message for the portfolio contact form.",
            "company": ""  # Empty honeypot
        }
        
        success, response = self.run_test(
            "Create valid contact message",
            "POST",
            "/contact",
            200,
            data=test_data,
            check_response=lambda r: r.get("success") == True and "id" in r
        )
        
        if success and "id" in response:
            self.test_message_id = response["id"]
            print(f"   ✓ Message ID: {self.test_message_id}")
        
        return success

    def test_contact_validation_invalid_email(self):
        """Test POST /api/contact rejects invalid email"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",  # Invalid email
            "subject": "Test Subject",
            "message": "This is a test message.",
            "company": ""
        }
        
        success, response = self.run_test(
            "Contact validation - invalid email",
            "POST",
            "/contact",
            422,  # Pydantic validation error
            data=test_data
        )
        
        if success:
            print(f"   ✓ Correctly rejected invalid email")
        
        return success

    def test_contact_validation_short_message(self):
        """Test POST /api/contact rejects too-short message"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Hi",  # Too short (min 5 chars)
            "company": ""
        }
        
        success, response = self.run_test(
            "Contact validation - message too short",
            "POST",
            "/contact",
            422,  # Pydantic validation error
            data=test_data
        )
        
        if success:
            print(f"   ✓ Correctly rejected short message")
        
        return success

    def test_inbox_auth_correct_password(self):
        """Test POST /api/inbox/auth with correct password returns JWT token"""
        test_data = {
            "password": "doeblah2025"
        }
        
        success, response = self.run_test(
            "Inbox auth - correct password",
            "POST",
            "/inbox/auth",
            200,
            data=test_data,
            check_response=lambda r: "token" in r and isinstance(r.get("token"), str) and len(r.get("token")) > 20
        )
        
        if success and "token" in response:
            self.inbox_token = response["token"]
            print(f"   ✓ JWT token received (length: {len(self.inbox_token)})")
        
        return success

    def test_inbox_auth_wrong_password(self):
        """Test POST /api/inbox/auth with wrong password returns 401"""
        test_data = {
            "password": "wrongpassword123"
        }
        
        success, response = self.run_test(
            "Inbox auth - wrong password",
            "POST",
            "/inbox/auth",
            401,
            data=test_data
        )
        
        if success:
            print(f"   ✓ Correctly rejected wrong password")
        
        return success

    def test_list_contacts_without_auth(self):
        """Test GET /api/contact without auth returns 401 (now protected)"""
        success, response = self.run_test(
            "List contacts - no auth (should fail)",
            "GET",
            "/contact",
            401
        )
        
        if success:
            print(f"   ✓ Correctly requires authentication")
        
        return success

    def test_contact_honeypot(self):
        """Test POST /api/contact honeypot - non-empty company field should not persist"""
        if not self.inbox_token:
            print("   ⚠️  Skipping honeypot test - no inbox token available")
            return True
        
        # First, get current message count
        _, messages_before = self.run_test(
            "Get messages before honeypot test",
            "GET",
            "/contact",
            200,
            auth_token=self.inbox_token
        )
        count_before = len(messages_before) if isinstance(messages_before, list) else 0
        
        # Submit with honeypot filled
        test_data = {
            "name": "Bot User",
            "email": "bot@spam.com",
            "subject": "Spam Subject",
            "message": "This is a spam message from a bot.",
            "company": "Spam Company Inc"  # Non-empty honeypot
        }
        
        success, response = self.run_test(
            "Contact honeypot - bot submission",
            "POST",
            "/contact",
            200,  # Should return 200 to fool bots
            data=test_data,
            check_response=lambda r: r.get("success") == True  # Should return success
        )
        
        if not success:
            return False
        
        # Now verify the message was NOT actually saved
        _, messages_after = self.run_test(
            "Get messages after honeypot test",
            "GET",
            "/contact",
            200,
            auth_token=self.inbox_token
        )
        count_after = len(messages_after) if isinstance(messages_after, list) else 0
        
        # Count should be the same (message not persisted)
        if count_after == count_before:
            print(f"   ✓ Honeypot working: message not persisted (count: {count_before} → {count_after})")
            return True
        else:
            print(f"   ❌ Honeypot failed: message was persisted (count: {count_before} → {count_after})")
            self.tests_run += 1  # Count the verification as a test
            return False

    def test_list_contacts(self):
        """Test GET /api/contact with valid token lists messages"""
        if not self.inbox_token:
            print("   ⚠️  Skipping - no inbox token available")
            return False
        
        success, response = self.run_test(
            "List contact messages - with auth",
            "GET",
            "/contact",
            200,
            auth_token=self.inbox_token,
            check_response=lambda r: isinstance(r, list)
        )
        
        if success:
            count = len(response)
            print(f"   ✓ Retrieved {count} message(s)")
            
            # Check if our test message is in the list
            if self.test_message_id and count > 0:
                found = any(msg.get("id") == self.test_message_id for msg in response)
                if found:
                    print(f"   ✓ Test message found in list")
                else:
                    print(f"   ⚠️  Test message not found in list")
            
            # Verify sorting (newest first)
            if count > 1:
                dates = [msg.get("createdAt") for msg in response if "createdAt" in msg]
                if len(dates) > 1:
                    # Check if sorted descending
                    is_sorted = all(dates[i] >= dates[i+1] for i in range(len(dates)-1))
                    if is_sorted:
                        print(f"   ✓ Messages sorted newest-first")
                    else:
                        print(f"   ⚠️  Messages may not be sorted correctly")
        
        return success

    def test_resume_pdf(self):
        """Test GET /api/resume/pdf returns valid PDF"""
        url = f"{self.base_url}/resume/pdf"
        
        self.tests_run += 1
        print(f"\n🔍 Test {self.tests_run}: Resume PDF download")
        print(f"   URL: {url}")
        
        try:
            response = requests.get(url, timeout=10)
            print(f"   Status: {response.status_code} (expected 200)")
            
            if response.status_code != 200:
                print(f"❌ FAILED - Expected 200, got {response.status_code}")
                return False
            
            # Check Content-Type
            content_type = response.headers.get('Content-Type', '')
            if 'application/pdf' not in content_type:
                print(f"❌ FAILED - Wrong Content-Type: {content_type}")
                return False
            
            print(f"   ✓ Content-Type: {content_type}")
            
            # Check Content-Disposition
            content_disposition = response.headers.get('Content-Disposition', '')
            if 'attachment' not in content_disposition:
                print(f"   ⚠️  Content-Disposition missing 'attachment': {content_disposition}")
            else:
                print(f"   ✓ Content-Disposition: {content_disposition}")
            
            # Check PDF signature
            pdf_content = response.content
            if pdf_content[:4] == b'%PDF':
                print(f"   ✓ Valid PDF signature")
                print(f"   ✓ PDF size: {len(pdf_content)} bytes")
            else:
                print(f"❌ FAILED - Invalid PDF signature")
                return False
            
            self.tests_passed += 1
            print(f"✅ PASSED")
            return True
            
        except Exception as e:
            print(f"❌ FAILED - Error: {str(e)}")
            return False

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        print(f"Total tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        print("="*60)
        
        if self.tests_passed == self.tests_run:
            print("✅ ALL TESTS PASSED!")
            return 0
        else:
            print("❌ SOME TESTS FAILED")
            return 1


def main():
    print("="*60)
    print("🚀 Portfolio Website Backend API Tests")
    print("="*60)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    tester = PortfolioAPITester()
    
    # Run all tests in order
    print("\n📋 BASIC ENDPOINTS")
    tester.test_root_endpoint()
    
    print("\n🔐 INBOX AUTHENTICATION (NEW)")
    tester.test_inbox_auth_correct_password()
    tester.test_inbox_auth_wrong_password()
    tester.test_list_contacts_without_auth()
    
    print("\n📧 CONTACT FORM (PUBLIC)")
    tester.test_create_valid_contact()
    tester.test_contact_validation_invalid_email()
    tester.test_contact_validation_short_message()
    
    print("\n📬 INBOX MESSAGES (PROTECTED)")
    tester.test_list_contacts()
    tester.test_contact_honeypot()
    
    print("\n📄 RESUME PDF")
    tester.test_resume_pdf()
    
    # Print summary
    return tester.print_summary()


if __name__ == "__main__":
    sys.exit(main())
