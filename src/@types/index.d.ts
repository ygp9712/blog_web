export type blogPostType = {
    userId: Number,
    id: Number | NULL,
    title: String,
    body: String
}

export type IProps<T> = { 
    params: T 
};


export type FieldError = { // react hook form
    type: string
    ref?: Ref
    types?: MultipleFieldErrors
    message?: Message
  }

export type UserType = {
    username?: String,
    password?: String,
    email?: String,
    phone?: String
}

