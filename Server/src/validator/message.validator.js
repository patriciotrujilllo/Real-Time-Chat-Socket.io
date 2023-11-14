import z from 'zod'

const messagesShema = z.object({
    content: z.string({
        required_error: 'message is required',
        invalid_type_error: 'message must be a string'
    }),
    emailUser: z.string().email({
        required_error: 'email is required',
        invalid_type_error: 'email must be a type email'
    })
})

export const validateMessage = (object) =>{
    return messagesShema.safeParse(object)
}