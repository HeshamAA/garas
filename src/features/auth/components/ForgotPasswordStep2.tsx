import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Key } from 'lucide-react';
import { forgotPasswordApi } from '../api/forgotPasswordApi';
import { useToast } from '@/hooks/use-toast';

interface ForgotPasswordStep2Props {
	email: string;
	onComplete: (otp: string) => void;
	onBack: () => void;
}

export const ForgotPasswordStep2 = ({ email, onComplete, onBack }: ForgotPasswordStep2Props) => {
	const [otp, setOtp] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!otp) {
			toast({ title: 'خطأ', description: 'من فضلك أدخل رمز التحقق', variant: 'destructive' });
			return;
		}

		setIsLoading(true);
		try {
			await forgotPasswordApi.verifyOtp({ email, otpCode: otp, forgetPassword: true });
			toast({ title: 'تم التحقق', description: 'رمز التحقق صحيح' });
			onComplete(otp);
		} catch (error) {
			toast({ title: 'خطأ', description: 'رمز التحقق غير صالح', variant: 'destructive' });
		} finally {
			setIsLoading(false);
		}
	};

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
