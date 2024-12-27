import { YoutubeTranscript } from 'youtube-transcript';
import { htmlToText } from 'html-to-text';
import pos from 'pos';

export const getWords = async (req, res) => {
    try {
        const { videoKey } = req.params
        const YOUTUBE_URL = "https://www.youtube.com/watch?v="

        //stores transcript in string
        let transcriptObj = await YoutubeTranscript.fetchTranscript(YOUTUBE_URL + videoKey)
        let text = transcriptObj.map((t) => t.text).join(' ');
        text = htmlToText(text);
        text = text.replace(/&#39;/g, "'");

        //stores words in a frequency map
        function wordFreq(string) {
            var words = string.replace(/[.]/g, '').split(/\s/);
            var freqMap = {};
            words.forEach(function (w) {
                if (!freqMap[w]) {
                    freqMap[w] = { frequency: 0, pos: "" };
                }
                freqMap[w].frequency += 1;
            });

            return freqMap;
        }
        let freqMap = wordFreq(text);

        //tags words
        var words = new pos.Lexer().lex(text);
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);
        for (let i in taggedWords) {
            var taggedWord = taggedWords[i];
            var word = taggedWord[0];
            var tag = taggedWord[1];

            if (!freqMap[word]) {
                continue;
            }

            freqMap[word].pos = tag;
        }

        function getMostCommonByTag(freqMap, tag, amount) {
            let list = Object.keys(freqMap).map((key) => {
                let obj = {}
                obj.word = key;
                obj.frequency = freqMap[key].frequency
                obj.pos = freqMap[key].pos
                return obj
            });

            list = list.filter((item) => {
                return item.pos.startsWith(tag);
            })

            list.sort(function (a, b) {
                return b.frequency - a.frequency;
            })

            return amount ? list.slice(0, amount) : list
        }

        let masterList = []
        masterList = masterList.concat(getMostCommonByTag(freqMap, "N", 10))
        masterList = masterList.concat(getMostCommonByTag(freqMap, "V", 10))
        masterList = masterList.concat(getMostCommonByTag(freqMap, "JJ", 10))
        masterList = masterList.concat(getMostCommonByTag(freqMap, "RB", 10))
        masterList.sort(function (a, b) {
            return b.frequency - a.frequency;
        })
        console.log(masterList)
        res.status(200).json({ success: true, data: masterList });
    } catch (error) {
        console.error("Error in Fetch Words:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

