export const getYoutubeTranscript = async (youtubeURL) => {
    try {
        const videoPageResponse = await fetch(youtubeURL);
        const videoPageBody = await videoPageResponse.text();
        const splittedHTML = videoPageBody.split('"captions":');
        const captions = (() => {
            try {
                return JSON.parse(
                    splittedHTML[1].split(',"videoDetails')[0].replace('\n', '')
                );
            } catch (e) {
                return undefined;
            }
        })()?.['playerCaptionsTracklistRenderer'];

        const transcriptURL = captions.captionTracks[0].baseUrl;
        if (!captions.captionTracks.find((track) => track.languageCode === "en")) {
            throw new Error('No English Transcript');
        }
        const transcriptResponse = await fetch(transcriptURL);
        const transcriptBody = await transcriptResponse.text();
        const RE_XML_TRANSCRIPT = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
        const results = [...transcriptBody.matchAll(RE_XML_TRANSCRIPT)];
        let transcript = results.map((result) => ({
            text: result[3],
            duration: parseFloat(result[2]),
            offset: parseFloat(result[1])
        }));
        return transcript
    } catch (error) {
        console.error("Error in Youtube Transcript:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}