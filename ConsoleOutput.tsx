import React, { useState, useEffect } from 'react';

const Logger = (props: any) => {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="container"
      style={{ border: '1px solid black', borderRadius: '3px', margin: '5px', padding: '5px' }}
    >
      <input
        checked={visible}
        onChange={e => {
          setVisible(!visible);
        }}
        type={'checkbox'}
      />{' '}
      <span>{props.title}</span>
      {visible ? (
        <React.Fragment>
          <ol style={{ margin: '0' }}>
            {props.logInfo.map((l: any, lx: any) => (
              <li key={`${props.title}-${lx}`}>{l}</li>
            ))}
          </ol>
        </React.Fragment>
      ) : null}
    </div>
  );
};

const ConsoleOutput: React.FC = props => {
  const [showLogOutput, setShowLogOutput] = useState(false);
  const [logState, setLogState] = useState([]);
  const [logErrorState, setLogErrorState] = useState([]);
  const [logInfoState, setLogInfoState] = useState([]);
  const [logWarnState, setLogWarnState] = useState([]);

  useEffect(() => {
    const console = (oldCons: any) => {
      const update = (oldState: any, text: any) => {
        const logCopy = oldState.slice(0);
        logCopy.push(text);
        return logCopy;
      };

      return {
        log: (text: never) => {
          oldCons.log(text);
          setLogState(logState => update(logState, text));
        },
        info: (text: any) => {
          oldCons.info(text);
          setLogInfoState(logInfoState => update(logInfoState, text));
        },
        warn: (text: any) => {
          oldCons.warn(text);
          setLogWarnState(logWarnState => update(logWarnState, text));
        },
        error: (text: never) => {
          setLogErrorState(logErrorState => update(logErrorState, text));
        }
      };
    };

    window.console = console(window.console);
    window.console.log('console initialized');
  }, []);

  const handleClear = () => {
    setLogState([]);
    setLogErrorState([]);
    setLogInfoState([]);
    setLogWarnState([]);
  };

  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: '3px',
        margin: '5px',
        padding: '5px',
        fontSize: 'small',
        backgroundColor: 'white'
      }}
    >
      <div className="d-flex justify-content-start">
        <button className="btn btn-primary my-1 mx-1" onClick={e => setShowLogOutput(!showLogOutput)}>
          {showLogOutput ? 'Hide' : 'Show'} Output Console
        </button>
        {showLogOutput && (
          <button className="my-1 mx-1 btn btn-danger" onClick={handleClear}>
            Clear All
          </button>
        )}
      </div>
      {showLogOutput ? (
        <div>
          <Logger title={'Logs'} logInfo={logState} />
          <Logger title={'Errors'} logInfo={logErrorState} />
          <Logger title={'Info'} logInfo={logInfoState} />
          <Logger title={'Warn'} logInfo={logWarnState} />
        </div>
      ) : null}
    </div>
  );
};

export default ConsoleOutput;
