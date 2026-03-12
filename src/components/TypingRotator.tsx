import { useState, useEffect, useCallback } from "react";

interface TypingRotatorProps {
	prefix: string;
	words: string[];
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
	initialDelay?: number;
	className?: string;
}

export function TypingRotator({
	prefix,
	words,
	typingSpeed = 100,
	deletingSpeed = 50,
	pauseDuration = 2000,
	initialDelay = 600,
	className = "",
}: TypingRotatorProps) {
	// Start empty, the first word types in on page load
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [displayedText, setDisplayedText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [isPaused, setIsPaused] = useState(true);

	const currentWord = words[currentWordIndex];

	// Hide the server-rendered placeholder and start typing after a short delay
	useEffect(() => {
		const placeholder = document.getElementById("typing-placeholder");
		if (placeholder) placeholder.style.visibility = "hidden";

		const timer = setTimeout(() => {
			setIsPaused(false);
		}, initialDelay);
		return () => clearTimeout(timer);
	}, [initialDelay]);

	const tick = useCallback(() => {
		if (isPaused) return;

		if (!isDeleting) {
			if (displayedText.length < currentWord.length) {
				setDisplayedText(currentWord.slice(0, displayedText.length + 1));
			} else {
				setIsPaused(true);
				setTimeout(() => {
					setIsPaused(false);
					setIsDeleting(true);
				}, pauseDuration);
			}
		} else {
			if (displayedText.length > 0) {
				setDisplayedText(displayedText.slice(0, -1));
			} else {
				setIsDeleting(false);
				setCurrentWordIndex((prev) => (prev + 1) % words.length);
			}
		}
	}, [currentWord, displayedText, isDeleting, isPaused, pauseDuration, words.length]);

	useEffect(() => {
		const speed = isDeleting ? deletingSpeed : typingSpeed;
		const timer = setTimeout(tick, speed);
		return () => clearTimeout(timer);
	}, [tick, isDeleting, typingSpeed, deletingSpeed]);

	return (
		<span className={className}>
			{prefix}
			{displayedText}
			<span
				className="inline-block w-[2px] h-[1.1em] bg-current ml-0.5 -mb-[0.15em]"
				style={{ animation: "blink 1s step-end infinite" }}
			/>
		</span>
	);
}
