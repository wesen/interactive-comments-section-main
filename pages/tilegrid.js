const Block = ({ className }) => {
  return <div className={`h-16 ${className} xs:h-auto xs:square`} />
}
export default function TileGrid() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="p-4 max-w-5xl grid gap-4 xs:grid-cols-2 md:grid-cols-4">
        <h1
          className="
        text-4xl font-extrabold
        xs:col-span-2 xs:grid xs:grid-cols-2 xs:gap-4
        md:col-span-3 md:grid-cols-3 md:text-5xl
        "
        >
          <span className="md:col-span-2">Grid layout with Tailwind CSS</span>
        </h1>
        <p
          className="
        xs:row-start-2 xs:col-start-2 xs:self-center
        md:col-start-1 md:col-span-2 md:pr-12 md:text-lg
        "
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          animi aut commodi consequuntur debitis dignissimos, dolorum et
          eveniet, fugiat fugit illum ipsam itaque labore nulla, odit provident
          quo quod velit?
        </p>
        <Block className="bg-blue-500" />
        <Block className="bg-blue-500" />
        <Block className="bg-pink-500" />
        <Block className="bg-blue-500 md:col-start-2" />
        <Block className="bg-pink-500" />
        <Block className="bg-blue-500" />
        <Block className="bg-blue-500" />
        <Block className="bg-pink-500" />
        <p
          className="
        xs:self-center
        md:text-lg md:col-span-2 md:px-4 mx:text-center
        "
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          exercitationem facere ipsa modi mollitia, nam natus nihil quis ratione
          tempora? Assumenda culpa dicta iure numquam perferendis, perspiciatis
          quaerat tempore? Unde.
        </p>
      </div>
    </div>
  )
}
