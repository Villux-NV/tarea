import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="border h-full flex justify-center items-center">
            <SignIn 
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