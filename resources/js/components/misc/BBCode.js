// import React, { useState, useRef, useEffect } from 'react';
// import bbcodeParser from 'ya-bbcode';

// const parser = new bbcodeParser();

// parser.registerTag('quote', {
//     type: 'replace',
//     open: (attr, testAttr) => {
//         console.log(attr, testAttr);
//         return `
//             <blockquote>
//                 <p>Written by ${post?.user.username}</p>
//                 <p>
//                     <a href="${post?.id}">Go to post</a>
//                 </p>
//         `;
//     },
//     close: '</blockquote>'
// });   

// export default function BBCode({ post }) {

//     console.log(parser.parse('[quote testAttr=asdsadd]Quote[/quote]'));

//     return (
//         <div>
            
//         </div>
//     );
// }