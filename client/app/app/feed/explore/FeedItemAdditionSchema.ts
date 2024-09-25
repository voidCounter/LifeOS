import {z} from "zod";

const youtubeFeedItemSchema = z.object({
        itemType: z.enum(["YOUTUBE"]).default("YOUTUBE"),
        youtubeUrl: z.string().refine((url) => {
            const standardYoutubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/;
            const shortenedYoutubeRegex = /^https:\/\/youtu\.be\/[\w-]+(\?.*)?$/;
            return standardYoutubeRegex.test(url) || shortenedYoutubeRegex.test(url)
        }, {
            message: "Invalid youtube URL format. It should be" +
                " https://www.youtube.com/watch?v={VIDEO_ID} or" +
                " https://youtu.be/{VIDEO_ID}?..."
        }),
    }
);

// TODO: Can we allow user to provide comma serparated article urls?
const articleFeedItemSchema = z.object({
    itemType: z.enum(["ARTICLE"]).default("ARTICLE"),
    articleUrl: z.string().url("Invalid Article URL").default(""),
});


export const feedItemAdditionSchema = z.discriminatedUnion("itemType", [
    youtubeFeedItemSchema,
    articleFeedItemSchema
]);
