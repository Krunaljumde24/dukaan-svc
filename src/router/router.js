// import { Router } from "express";
// import { body, header, query, validationResult } from "express-validator";



// const router = Router({ strict: true })

// router.get('/', (req, res) => {
//     res.status(200).send('Ok')
// })

// // router.post('/signup', query('person').notEmpty(), (req, res) => {
// //     const result = validationResult(req);
// //     // res.send(result)
// //     if (result.isEmpty()) {
// //         res.send(`Hello, ${req.query.person}!`);
// //     }
// //     res.status(400).send({ error: result.array() })
// // })



// const tokenValidation = (isRefresh = false) => {
//     let refreshText = isRefresh ? 'Refresh' : 'Authorization';

//     return [
//         header('Authorization', `Please provide your ${refreshText} token`)
//             .exists()
//             .not()
//             .isEmpty()
//             .custom((value, { req }) => {
//                 if (!value.startsWith('Bearer') || !value.split(' ')[1]) {
//                     throw new Error(`Invalid ${refreshText} token.`)
//                 }
//                 if (isRefresh) {
//                     req.headers.refresh_token = value.split(' ')[1];
//                     return true;
//                 }
//                 req.headers.access_token = value.split(' ')[1];
//                 return true;
//             })
//     ]
// }

// router.post('/signup',
//     [
//         body('name')
//             .trim()
//             .not()
//             .isEmpty()
//             .withMessage('Name must not be empty')
//             .isLength({ min: 3 })
//             .withMessage('Name must be at least 2 characters long')
//             .escape(),
//         body('email', 'Invalid email address')
//             .trim()
//             .isEmail()
//             .custom(async (email) => {
//                 const isExist = await fetchUserByEmailId(email);
//                 if (isExist.length)
//                     throw new Error('A user already exists with this e-mail address');
//                 return true;
//             }),
//         body('password')
//             .trim()
//             .isLength({ min: 4 })
//             .withMessage('Password must be at least 4 characters long')

//     ], (req, res) => {
//         res.status(200).send('regerterd!')
//     });

// export default router;