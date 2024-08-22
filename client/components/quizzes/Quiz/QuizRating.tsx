interface QuizRatingProps {
    rating: String
}

export default function QuizRating({rating}: QuizRatingProps) {
    return (
        rating && <div
            className="text-center text-foreground text-xs font-normal leading-none">⭐
            {rating}
        </div>
    );
}