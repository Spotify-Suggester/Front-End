
import React, { useState, useEffect } from "react";
import MinusSign from "../svg/MinusSign"
import PlusSign from "../svg/PlusSign"

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};
  
const PlayButton = ({ url, className }) => {
    const [playing, toggle] = useAudio(url);
  
    return (
        <button className={className} onClick={toggle}>{playing ? <PlusSign /> : <MinusSign />}</button>
    );
};

export default PlayButton;