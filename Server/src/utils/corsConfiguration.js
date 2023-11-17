export const corsConfiguration = () => {
    const corsOption = {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        preflightContinue: false,
        optionsSuccessStatus: 200
    }

    return corsOption
}