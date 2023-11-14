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

    active: z.boolean().optional().default(1),

    email: z.string().email({
        required_error: 'email is required',
        invalid_type_error: 'email must be a type @email'
    }),

    img: z.any().refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
            }, `Max image size is 5MB.`)
            .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    password: z.string({
        required_error: 'password is required'
    }),
    confirmpassword: z.string({
        required_error: 'password is required'
    })
    .refine((data)=>data.password === data.confirmpassword, {
        message: 'password do not match',
        path: ['confirmpassword']
    }),
    roleId: z.number().default(2)

    })

export const validateUser = (object) =>{
    return userShema.safeParse(object)
}