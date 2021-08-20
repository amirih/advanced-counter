import {useState} from "react";
import {Button, TimePicker} from "antd";
import {GrPowerReset} from "react-icons/gr";
import moment from "moment";

const IndexPage = () => {
    const defaultTotalTime = moment("00:00:30", "HH:mm:ss");
    const defaultStepTime = moment("00:00:10", "HH:mm:ss");
    const defaultDelayTime = moment("00:0:05", "HH:mm:ss");
    const referenceTime = moment("00:0:00", "HH:mm:ss");

    const [totalTime, setTotalTime] = useState(defaultTotalTime);
    const [stepTime, setStepTime] = useState(defaultStepTime);
    const [delayTime, setDelayTime] = useState(defaultDelayTime);

  let totalInterval = undefined;
  let comonInterval = undefined;
  let delayInterval = undefined;

    const resetTotalTimeTo = (time = defaultTotalTime) => {
        setTotalTime(time);
    };
    const resetStepTimeTo = (time = defaultStepTime) => {
        setStepTime(time);
    };
    const resetDelayTimeTo = (time = defaultDelayTime) => {
        setDelayTime(time);
    };

    const resetAll = () => {
        resetTotalTimeTo();
        resetStepTimeTo();
        resetDelayTimeTo();
    }

    const startCounting = async () => {
        const now = moment();
        const baseTotalTime = totalTime;
        const baseStepTime = stepTime;
        const baseDelayTime = delayTime;

        await countDownTotalTime(totalTime, now);
        await countDownStepTime(delayTime, stepTime, now);
    };
    const stopCounting = () => {
        //reset timers
        console.log("reset the timers")

    }
    const pauseCounting = () => {
        console.log("pause the timers")
    }

    const countDownTotalTime = (baseTotalTime, baseCountingTime) => {
      totalInterval = setInterval(() => {
            const timer = moment(baseTotalTime.diff(moment(moment().diff(baseCountingTime))))
            setTotalTime(timer);
            if (timer < referenceTime) {
                resetTotalTimeTo(baseTotalTime);
                clearInterval(totalInterval)
            }
        }, 1000);
    };



    const countDownStepTime = (baseDelayTime, baseStepTime, baseCountingTime) => {
      clearInterval(comonInterval);
      console.log("in countDownStepTime", comonInterval)

      comonInterval = setInterval(() => {
            const timer = moment(
                baseStepTime.diff(moment(moment().diff(baseCountingTime)))
            );
            setStepTime(timer);
            if (timer<referenceTime){
              setStepTime(baseStepTime);
               countDownDelayTime(baseDelayTime, baseStepTime, baseCountingTime)

            }

        }, 1000);
    };
  const countDownDelayTime = (baseDelayTime, baseStepTime, baseCountingTime) => {
    clearInterval(comonInterval)
    console.log("in countDownDelayTime", comonInterval)
    comonInterval =  setInterval(() => {
      const timer = moment(
          baseDelayTime.diff(moment(moment().diff(baseCountingTime)))
      );
      setDelayTime(timer);
      if (timer <referenceTime)
        setDelayTime(baseDelayTime);

       countDownStepTime(baseDelayTime, baseStepTime, baseCountingTime)

    }, 1000);
  };
    //utils
    const getMilSeconds = (moment) => {
        return moment.valueOf() - referenceTime.valueOf();
    };

    return (
        <div className="container">
            <div>
                <p>{JSON.stringify(stepTime)}</p>
                <TimePicker
                    value={totalTime}
                    placeholder="Total Time"
                    onSelect={resetTotalTimeTo}
                    clearIcon=""
                    suffixIcon=""
                />
                <Button
                    onClick={resetTotalTimeTo}
                    style={{border: "none"}}
                    icon={<GrPowerReset/>}
                ></Button>
                <TimePicker
                    value={stepTime}
                    placeholder="Step Time"
                    onSelect={resetStepTimeTo}
                    clearIcon=""
                    suffixIcon=""

                />
                <Button
                    onClick={resetStepTimeTo}
                    style={{border: "none"}}
                    icon={<GrPowerReset/>}
                ></Button>
                <TimePicker
                    value={delayTime}
                    placeholder="Delay Time"
                    onSelect={resetDelayTimeTo}
                    clearIcon=""
                    suffixIcon=""
                />
                <Button
                    onClick={resetDelayTimeTo}
                    style={{border: "none"}}
                    icon={<GrPowerReset/>}
                ></Button>
                <Button
                    onClick={resetAll}
                >Reset All</Button>

            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <Button onClick={startCounting}> Start</Button>
                <Button onClick={stopCounting}> Stop</Button>
                <Button onClick={pauseCounting}> Pause</Button>
            </div>
        </div>
    );
};

export default IndexPage;
