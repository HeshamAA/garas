interface ParentsErrorMessageProps {
  error: string;
}

export const ParentsErrorMessage = ({ error }: ParentsErrorMessageProps) => {
  return (
    <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-right animate-slide-in-right">
      {error}
    </div>
  );
};
