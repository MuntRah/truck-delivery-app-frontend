export default function CustomerDate({name, date}){
    return (
      <p>
        {name} posted on &nbsp;
        {new Date(date).toLocaleDateString()}
      </p>
    )
  }