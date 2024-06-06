import React from 'react'
import Card from 'components/card';

export default function PageDetailProduct({label}) {
  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="relative mb-3 flex items-center justify-between pt-1">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Detail 
        </h4>
        
      </div>
      </Card>
  )
}
