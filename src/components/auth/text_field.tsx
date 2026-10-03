// Flora has no text input yet; this is a candidate to move there.
export function TextField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className="flex flex-col gap-1 text-sm">
            {label}
            <input
                className="rounded-md border border-(--border) bg-(--background) px-3 py-2 text-base text-(--on-background) outline-none focus:border-(--focus)"
                {...props}
            />
        </label>
    );
}
