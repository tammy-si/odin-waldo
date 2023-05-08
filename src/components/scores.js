import { useLocation } from "react-router-dom";

function Scores() {
    const { state } = useLocation();
    const time = state.time;

    // for formatting the time
    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
      }
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;

    return (
        <div className="scores">
            <form>
                <input type="text" placeholder="Name"></input>
                <p className="last-score">{ str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds , '0', 2) }</p>
            </form>
        </div>
    )
}

export default Scores;