// auth.js
class AuthManager {
  constructor() {
    this.correctHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; // SHA-256 of "password"
    this.errorElement = document.getElementById('error');
  }

  async sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async authenticate(password) {
    const hash = await this.sha256(password);
    if (hash === this.correctHash) {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } else {
      this.errorElement.innerText = 'Incorrect password. Please try again.';
      return false;
    }
  }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
  }
}

// Export for use in other modules
window.AuthManager = AuthManager;
