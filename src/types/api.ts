
export interface baseResponse<Data>{
    res_code: number;
    res_type: 'success' | 'error' | string;
    res_message: string;
    res_data: Data;
    res_time: number;
}

export interface Data<T> {
  data: T
}

export interface OTP_Response {
    TempToken: string;
    RefCode: string;
    RequestTime: string;
    RemainingTime: number;
    OtpExpireIn: number;    
}

export interface extendTime {
    FormatingTime: FormatingTime_Type;
    PasswordPolicyRule?: any;
    Permission?: any;
}

export interface FormatingTime_Type {
    currentTime: ZoneTime_Type;
    extendTime: ZoneTime_Type;
    expireTime: ZoneTime_Type;
}

export interface ZoneTime_Type {
    utc: TimeType ;
    asiaBangkok: TimeType ;
}

export interface TimeType {
    unixTimestamp: number;
    isostring: string;
}


