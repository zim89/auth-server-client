import clsx from 'clsx'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from './AuthForm.module.scss'
import { AuthToggle } from './AuthToggle'

import { SocialMediaButtons } from './SocialMediaButtons'
import { useAuthForm } from './useAuthForm'

interface AuthFormProps {
	isLogin: boolean
}

export function AuthForm({ isLogin }: AuthFormProps) {
	const { handleSubmit, isLoading, onSubmit, recaptchaRef, register } =
		useAuthForm(isLogin)

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-sm mx-auto"
		>
			<div className="mb-4">
				<label className="text-gray-600">
					Email
					<input
						type="email"
						placeholder="Enter email: "
						{...register('email', { required: true })}
						className={clsx(
							styles['input-field'],
							'w-full p-2 border rounded focus:outline-none focus:border-blue-500'
						)}
					/>
				</label>
			</div>

			<div className="mb-4">
				<label className="text-gray-600">
					Пароль
					<input
						type="password"
						placeholder="Enter password: "
						{...register('password', { required: true })}
						className={clsx(
							styles['input-field'],
							'w-full p-2 border rounded focus:outline-none focus:border-blue-500'
						)}
					/>
				</label>
			</div>

			<ReCAPTCHA
				ref={recaptchaRef}
				size="normal"
				sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
				theme="light"
				className={styles.recaptcha}
			/>

			<div className="mb-3">
				<button
					type="submit"
					className={clsx(
						styles['btn-primary'],
						isLogin ? 'bg-blue-500' : 'bg-teal-500',
						isLoading ? 'opacity-75 cursor-not-allowed' : ''
					)}
					disabled={isLoading}
				>
					{isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</div>

			<SocialMediaButtons />

			<AuthToggle isLogin={isLogin} />
		</form>
	)
}
