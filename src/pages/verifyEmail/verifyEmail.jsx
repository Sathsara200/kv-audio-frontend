import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function VerifyEmail() {
    const token = localStorage.getItem("token")
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Send OTP only once when component mounts
    useEffect(() => {
        if (!token) {
            toast.error("Authentication required")
            navigate("/login")
            return
        }

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            toast.success("OTP sent to your email")
        })
        .catch((err) => {
            console.error(err)
            toast.error("Failed to send OTP")
        })
    }, [token, navigate])

    function handleVerifyEmail() {
        if (!otp) {
            toast.error("Please enter OTP")
            return
        }

        setLoading(true)

        axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`,
            { code: Number(otp) },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(() => {
            toast.success("Email verified successfully")
            navigate("/")
        })
        .catch((err) => {
            console.error(err)
            toast.error("Invalid OTP")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-[400px] bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-2">Verify Email</h1>
                <p className="text-gray-500 mb-4 text-center">
                    Please enter the OTP sent to your email
                </p>

                <input
                    type="number"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border p-2 rounded-lg w-full mb-4 focus:outline-blue-500"
                />

                <button
                    onClick={handleVerifyEmail}
                    disabled={loading}
                    className={`w-full p-2 rounded-lg text-white transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </div>
        </div>
    )
}
