import OutputBlock from './OutputBlock';
import AsciiAvatar from './AsciiAvatar';

export default function HistoryBlock({ history }) {
  return (
    <>
      {history.map((entry, i) => {
        if (entry.type === 'welcome') {
          return (
            <div key={i}>
              <AsciiAvatar />
              <OutputBlock command={null} output={entry.output} />
            </div>
          );
        }
        return (
          <OutputBlock
            key={i}
            command={entry.command}
            output={entry.output}
            isError={entry.isError}
            isSuccess={entry.isSuccess}
          />
        );
      })}
    </>
  );
}
