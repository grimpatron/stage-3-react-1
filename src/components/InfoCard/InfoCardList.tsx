interface InfoCardListProps {
  character: Record<string, string | string[]>;
}

function InfoCardList({ character }: InfoCardListProps) {
  const checkValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      const listItems = value.map((item, index) => <li key={index}>{item}</li>);
      return <ol className='result-list--nested'>{listItems}</ol>;
    }
    return value;
  };

  return (
    <ul className='result-list'>
      {Object.entries(character).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {checkValue(value)}
        </li>
      ))}
    </ul>
  );
}

export default InfoCardList;
