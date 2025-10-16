import { createContext, useState, useContext, useEffect } from 'react';
import { 
  registerUserAPI, 
  getAllUsersAPI, 
  updateUserAPI,
  getUserByEmailAPI,
  getUserByUsernameAPI
} from '../services/userAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register new user
  const register = async (userData) => {
    const { username, email, password, fullName } = userData;

    try {
      // Check if email already exists
      const emailResponse = await getUserByEmailAPI(email);
      if (emailResponse.data && emailResponse.data.length > 0) {
        return { success: false, message: 'Email already registered' };
      }

      // Check if username already exists
      const usernameResponse = await getUserByUsernameAPI(username);
      if (usernameResponse.data && usernameResponse.data.length > 0) {
        return { success: false, message: 'Username already taken' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // In production, this should be hashed
        fullName,
        avatar: null,
        createdAt: new Date().toISOString()
      };

      // Save to database
      const response = await registerUserAPI(newUser);

      if (response.status === 201) {
        // Auto login after registration
        const userToStore = { ...response.data };
        delete userToStore.password; // Don't store password in current user
        setUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));

        return { success: true, message: 'Registration successful' };
      } else {
        return { success: false, message: 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration' };
    }
  };

  // Login user
  const login = async (credentials) => {
    const { emailOrUsername, password } = credentials;

    try {
      // Get all users
      const response = await getAllUsersAPI();

      if (response.data) {
        // Find user
        const foundUser = response.data.find(u => 
          (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
        );

        if (!foundUser) {
          return { success: false, message: 'Invalid credentials' };
        }

        // Set current user
        const userToStore = { ...foundUser };
        delete userToStore.password;
        setUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));

        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      // Get current user data from database
      const response = await getAllUsersAPI();
      const currentUser = response.data.find(u => u.id === user.id);

      if (!currentUser) {
        console.error('User not found');
        return;
      }

      // Merge updates with current user
      const updatedUserData = { ...currentUser, ...updates };

      // Update in database
      const updateResponse = await updateUserAPI(user.id, updatedUserData);

      if (updateResponse.status === 200) {
        const updatedUser = { ...updateResponse.data };
        delete updatedUser.password;
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

