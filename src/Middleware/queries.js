// import { request, gql } from "graphql-request";

// export async function getEvents() {
// const events = gql`
//   query {
//     sampleEvents {
//       id
//       name
//       event_type
//       permission
//       start_time
//       end_time
//       description
//       speakers {
//         name
//       }
//       public_url
//       private_url
//       related_events
//     }
//   }
// `;

// await request('https://api.hackthenorth.com/v3/graphql/', events).then((data) => {
//   return data.sampleEvents;
// });
// }