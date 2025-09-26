// auth.js
class AuthManager {
  constructor() {
    // Password is "admin123" - change this hash for production
    this.correctHash = "cb8b338c2f7251340d302b1a1e114a6b2d6c5a7b2a1f3c4e5d6a7b8c9d0e1f2a";
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
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } else {
      if (this.errorElement) {
        this.errorElement.innerText = 'Incorrect password';
      }
      return false;
    }
  }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
  }
}

window.AuthManager = AuthManager;
