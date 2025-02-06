// User-related interfaces
export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName : string;
    about : string;
    email: string;
    password?: string; // Optional, used only during registration/login
    crtAt: Date;
    updtdBy: Date;
  }
  export interface LoginReposne {
    token: string;
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string | null;
  }
  export interface LoginCredentials {
    usernameOrEmail: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    firstName : string;
    lastName : string;
    userName: string;
    email: string;
    password: string;
  }
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }
  // Error handling interfaces
  export interface ErrorResponse {
    statusCode: number;
    message: string;
    error: string;
  }



  export interface MailContent {
    mlCntntId: string;
    mlCntnt: string;
    addByUser: string;
    title: string;
    subject: string;
    file: string;
    cc: string;
    bcc: string;
    addTm: string; // ISO string format for timestamps
    uptTm: string; // ISO string format for timestamps
  }
  
  export interface MailGroup {
    mGrpId: string;
    mGrpNm: string;
    adedUsr: string;
    mailIds: string[]; // Assuming TBNovaEmailPilotMailId maps to string IDs
    addTs: string; // ISO string format for timestamps
    updtTs: string; // ISO string format for timestamps
  }
  
  export interface Mail {
    mId: string;
    mailId: string;
    hrName: string;
    cmpnyNm: string;
    addByUser: string;
    mailGroups: string[]; // Assuming TBNovaEmailPilotMailGroup maps to string IDs
    addTs: string; // ISO string format for timestamps
    updtTs: string; // ISO string format for timestamps
  }
  
  export interface ScheduledEmail {
    id: string;
    userId: string;
    grpId: string;
    emailTemp: string;
    scheduledTime: string; // ISO string format for timestamps
    timeZone: string;
    crtTm: string; // ISO string format for timestamps
    uptTm: string; // ISO string format for timestamps
    scheduleDaily: string;
    scheduleDailyTime: string; // ISO string format for time
  }