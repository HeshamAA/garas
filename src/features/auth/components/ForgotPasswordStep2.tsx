import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Key } from 'lucide-react';
import { useForgotPasswordStep2 } from '../hooks/useForgotPasswordStep2';

interface ForgotPasswordStep2Props {
	email: string;
	onComplete: (otp: string) => void;
	onBack: () => void;
}

export const ForgotPasswordStep2 = ({ email, onComplete, onBack }: ForgotPasswordStep2Props) => {
	const { otp, setOtp, isLoading, handleSubmit } = useForgotPasswordStep2({ email, onComplete });

	return (
		<div className="space-y-6">
			<button
				onClick={onBack}
				className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				العودة
			</button>

			<div className="space-y-2">
				<h1 className="text-2xl font-bold">تحقق من بريدك</h1>
				<p className="text-muted-foreground">أدخل رمز التحقق المرسل إلى {email}</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="otp">رمز التحقق</Label>
					<div className="relative">
						<Key className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							id="otp"
							type="text"
							placeholder="مثال: 57753"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="pr-10"
							disabled={isLoading}
						/>
					</div>
				</div>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? 'جاري التحقق...' : 'التحقق'}
				</Button>
			</form>
		</div>
	);
};
