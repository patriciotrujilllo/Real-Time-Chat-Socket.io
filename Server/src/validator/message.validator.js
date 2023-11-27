import z from 'zod'

const messagesShema = z.object({
    content: z.string({
        required_error: 'message is required',
        invalid_type_error: 'message must be a string'
    }),
    idUser: z.string({
        required_error: 'ID is required',
        invalid_type_error: 'idUser must be a type STRING'
    })
})

export const validateMessage = (object) =>{
    return messagesShema.safeParse(object)
}