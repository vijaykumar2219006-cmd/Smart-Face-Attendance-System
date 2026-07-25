export default function Button({
    children,
    onClick,
    variant = "primary"
}) {

    const styles = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",

        warning:
            "bg-orange-500 hover:bg-orange-600 text-white"
    };

    return (

        <button
            onClick={onClick}
            className={`
                px-5
                py-3
                rounded-lg
                font-medium
                transition
                ${styles[variant]}
            `}
        >

            {children}

        </button>

    );

}