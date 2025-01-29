export interface Identity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
    provider: string;
    last_sign_in_at: string; 
    created_at: string;
    updated_at: string; 
    email: string;
  }
  
  export interface AppMetadata {
    role: string;
  }
  
  export interface UserMetadata {
    role: string;
  }
  
  export interface UserDto {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string; // ISO string for date-time
    phone: string;
    confirmed_at: string; // ISO string for date-time
    recovery_sent_at: string; // ISO string for date-time
    last_sign_in_at: string; // ISO string for date-time
    app_metadata: AppMetadata;
    user_metadata: UserMetadata;
    identities: Identity[];
    created_at: string; // ISO string for date-time
    updated_at: string; // ISO string for date-time
    is_anonymous: boolean;
  }
  