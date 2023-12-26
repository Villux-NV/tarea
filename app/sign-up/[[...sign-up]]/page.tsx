import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="h-full flex justify-center items-center">
            <SignUp 
                appearance={{
                    elements: {
                        formButtonPrimary: 'bg-black rounded-none',
                        card: 'rounded-none bg-white outline-double outline-4 outline-white',
                        socialButtonsBlockButton: 'rounded-none',
                        formFieldInput: 'rounded-none',
                        rootBox: 'bg-black'
                    },
                }}
            />
        </div>
    )
}