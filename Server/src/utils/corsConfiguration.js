export const corsConfiguration = () => {
    const corsOption = {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST'],
        preflightContinue: false,
        optionsSuccessStatus: 200
    }

    return corsOption
}