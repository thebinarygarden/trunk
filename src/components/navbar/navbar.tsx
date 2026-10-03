'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggleButton } from "@binarygarden/flora/theme";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
    const { data: session } = authClient.useSession();

    return (
        <div className="fixed top-4 right-4 flex">
            <motion.div
                className="m-2 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Link href={session ? "/account" : "/sign-in"} className="text-(--on-background)">
                    {session ? "Account" : "Sign in"}
                </Link>
                <ThemeToggleButton />
            </motion.div>
        </div>
    );
}
