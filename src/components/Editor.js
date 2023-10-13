export default function Editor({
  groups,
  term,
  setTerm,
  group,
  setGroup,
  author,
  setAuthor,
  markdown,
  setMarkdown,
  markdownRef
}) {
  return (
    <div className="p-5 space-y-4 bg-ashes-100 md:pb-8 md:w-[33rem] h-fit">
      {/* top bit */}
      <div className="space-y-2">
        {/* term */}
        <div className="flex items-baseline space-x-1">
          <div className="text-sm">Term:</div>
          <input 
            type="text"
            placeholder="TERM"
            value={ term }
            onChange={ e => setTerm(e.target.value) } 
            className="font-semibold placeholder-ashes-700 text-ashes-700 focus:outline-none"
          />
        </div>
        {/* group */}
        <select value={ group } onChange={ e => setGroup(e.target.value) } className="font-semibold text-ashes-700">
          <option value={ null }>Group</option>
          { Object.keys(groups).map(group => 
            <option key={ group } value={ group }>{ group }</option>
          )}
        </select>
        {/* name */}
        <div className="flex items-baseline space-x-1">
          <div className="text-sm">by</div>
          <input 
            type="text"
            placeholder="Name Surname"
            value={ author }
            onChange={ e => setAuthor(e.target.value) } 
            className="font-semibold placeholder-ashes-700 text-ashes-700 focus:outline-none"
          />
        </div>
      </div>
      {/* markdown */}
      <textarea
        ref={ markdownRef }
        value={ markdown }
        onChange={ e => setMarkdown(e.target.value) }
        className="w-full resize-none text-ashes-500 focus:outline-none"
      />
    </div>
)}