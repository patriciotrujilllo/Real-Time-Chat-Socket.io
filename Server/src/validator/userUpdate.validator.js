import z from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const userShema = z.object({

    firstName: z.string({
        required_error: 'firstName is required',
        invalid_type_error: 'name must be a string'
    }),

    lastName: z.string({
        required_error: 'lastName is required',
        invalid_type_error: 'lastName must be a string'
    }),

    active: z.string().transform(parseInt).optional().default(1),

    email: z.string().email({
        required_error: 'email is required',
        invalid_type_error: 'email must be a type @email'
    }),

    img: z.object({
        size: z.number(),
        type: z.string(),
    }).refine(file => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(file => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .webp formats are supported."),

    password: z.string(),
    roleId: z.string().transform(parseInt).default(2)
    })

export const validateUpdateUser = (object) =>{
    return userShema.safeParse(object)
}
export const validateUpdateUserPartial = (object) =>{
    return userShema.partial().safeParse(object)
}