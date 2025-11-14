import React, { useState, useEffect } from 'react';
import { 
  BookMarked, Clock, BarChart3, Brain, CheckCircle2, 
  XCircle, ChevronRight, ChevronLeft, Home, Play,
  Target, TrendingUp, Award, Lock, Unlock
} from 'lucide-react';

// Question bank - 100 PCC-level questions
const QUESTIONS = [
  // COMPETENCY 1: Demonstrates Ethical Practice (12 questions)
  {
    id: 1,
    competency: 1,
    difficulty: 'hard',
    scenario: 'A potential client mentions they\'re seeing a therapist for depression and want coaching to "supplement" their therapy.',
    question: 'What is the MOST ethically appropriate response?',
    options: [
      'Agree to coach them since coaching and therapy serve different purposes',
      'Decline to work with them until their therapy is complete',
      'Explore the client\'s goals, consult with their therapist, and ensure all parties understand the distinction between coaching and therapy',
      'Coach them but avoid topics related to their depression'
    ],
    correct: 2,
    explanation: 'The ICF Ethics require coaches to understand the distinction between coaching and other professions. Option C properly addresses this by ensuring all parties understand the boundaries and maintain appropriate coordination. Simply declining (B) or accepting without coordination (A) doesn\'t serve the client. Option D creates an artificial boundary that\'s impossible to maintain.',
    insight: 'PCC coaches demonstrate ethical practice by proactively managing boundaries and ensuring coordination when clients work with multiple professionals.'
  },
  {
    id: 2,
    competency: 1,
    difficulty: 'hard',
    scenario: 'During a session, your client reveals they\'re planning to leave their company and take confidential client data with them to start a competing business.',
    question: 'What does the ICF Code of Ethics require you to do?',
    options: [
      'Maintain confidentiality and continue coaching',
      'Explain your ethical boundaries, express concern about the legal implications, and support them in exploring legal alternatives',
      'Terminate the coaching relationship immediately',
      'Report their plans to their current employer'
    ],
    correct: 1,
    explanation: 'The ICF Code of Ethics requires coaches to respect confidentiality while also not knowingly participating in illegal activities. Option B addresses this tension by maintaining the relationship while clearly expressing boundaries and redirecting toward legal options. Option A ignores potential illegality. Options C and D end the coaching prematurely without attempting to serve the client within ethical boundaries.',
    insight: 'Ethical coaching sometimes means holding both confidentiality and professional boundaries simultaneously, helping clients navigate toward lawful choices.'
  },
  {
    id: 3,
    competency: 1,
    difficulty: 'medium',
    scenario: 'A former client refers a close friend to you. During the intro call, this new client asks about your work with the mutual friend.',
    question: 'What response BEST demonstrates ethical practice?',
    options: [
      'Share general positive feedback about working with their friend',
      'Say "I\'m glad they recommended me, but I maintain confidentiality about all client relationships"',
      'Confirm you worked with their friend but can\'t share details',
      'Deflect by focusing on their goals instead'
    ],
    correct: 1,
    explanation: 'Option B is most aligned with ICF ethics because it doesn\'t even confirm the coaching relationship existed. Strict confidentiality means not revealing who you work with. Option C confirms the relationship, which is already sharing confidential information. Option A compounds this. Option D avoids but doesn\'t educate about boundaries.',
    insight: 'PCC-level confidentiality includes not confirming or denying client relationships unless given explicit permission.'
  },
  {
    id: 4,
    competency: 1,
    difficulty: 'medium',
    scenario: 'Your client is a senior executive. Their company wants to pay for coaching but requests quarterly progress reports.',
    question: 'How do you handle this ethically?',
    options: [
      'Agree to provide reports since the company is paying',
      'Decline the engagement to avoid conflicts of interest',
      'Discuss with the client what they\'re comfortable sharing, establish a three-way agreement, and only share what the client approves',
      'Provide reports but keep them vague and general'
    ],
    correct: 2,
    explanation: 'Sponsor-coach-client triads require transparent agreements that honor the client\'s agency. Option C properly establishes this by getting clear agreement on what will be shared. Option A violates client autonomy. Option B unnecessarily limits the opportunity. Option D creates ambiguity rather than clarity.',
    insight: 'Ethical three-way agreements explicitly address what information will be shared with sponsors and give the client full agency in that decision.'
  },
  {
    id: 5,
    competency: 1,
    difficulty: 'hard',
    scenario: 'You realize mid-session that this client\'s issue is outside your area of competence - it involves complex organizational change management which you haven\'t studied.',
    question: 'What action BEST demonstrates ethical competence standards?',
    options: [
      'Continue the session and research the topic afterward',
      'Name your limitation in real-time, continue if the client wants to proceed with your support, and commit to expanding your knowledge or making a referral',
      'Finish the session, then recommend they find a different coach',
      'Continue coaching but avoid the specific topic'
    ],
    correct: 1,
    explanation: 'ICF ethics require coaches to maintain and develop professional competence. Option B demonstrates this by being transparent about limitations while honoring the client\'s choice and committing to professional development or appropriate referral. Option A is dishonest. Option C abandons the client abruptly. Option D creates artificial boundaries.',
    insight: 'Competence means knowing and being transparent about your limits, then giving clients choice about how to proceed.'
  },
  {
    id: 6,
    competency: 1,
    difficulty: 'medium',
    scenario: 'A client wants to record your coaching sessions to review them later.',
    question: 'What\'s the most appropriate response?',
    options: [
      'Agree since it could benefit their learning',
      'Decline because recording changes the coaching dynamic',
      'Explore their goal for recording, discuss how it might impact the coaching relationship, and make a mutually agreed decision',
      'Agree but request they not share the recordings'
    ],
    correct: 2,
    explanation: 'Rather than unilaterally deciding, Option C engages the client in understanding the implications and making a collaborative decision. This honors both the coach\'s concerns about confidentiality and relationship impact, and the client\'s learning needs. Options A and B make unilateral decisions. Option D agrees but doesn\'t fully address the implications.',
    insight: 'Ethical practice involves collaborative decision-making about the coaching relationship structure, not just unilateral coach decisions.'
  },
  {
    id: 7,
    competency: 1,
    difficulty: 'hard',
    scenario: 'During a group coaching program, one participant privately tells you another participant has been sharing confidential details from the sessions on social media.',
    question: 'What action demonstrates ethical responsibility?',
    options: [
      'Address it with the whole group in the next session',
      'Privately contact the person allegedly posting to discuss group agreements',
      'Thank the person for sharing and take no action since you haven\'t seen the posts',
      'Investigate by checking the social media accounts of all participants'
    ],
    correct: 1,
    explanation: 'Option B directly addresses a potential ethics violation while respecting everyone\'s dignity by handling it privately first. This allows for clarification, potential misunderstanding, and correction. Option A could shame the person publicly. Option C ignores a serious ethical issue. Option D violates everyone\'s privacy.',
    insight: 'When ethical issues arise in group coaching, address them directly but privately first, allowing for clarification and correction with dignity.'
  },
  {
    id: 8,
    competency: 1,
    difficulty: 'medium',
    scenario: 'You\'re coaching someone who reports to your close friend. Your friend mentions casually "I hear you\'re working with Jamie now."',
    question: 'What response maintains ethical boundaries?',
    options: [
      'Confirm but say you can\'t discuss details',
      'Neither confirm nor deny, and remind them of your confidentiality standards',
      'Change the subject',
      'Ask how they found out'
    ],
    correct: 1,
    explanation: 'Option B maintains complete confidentiality by not confirming the relationship and educating about boundaries. Option A confirms the relationship, which is already revealing confidential information. Options C and D avoid but don\'t establish clear boundaries.',
    insight: 'True confidentiality means not confirming or denying client relationships, even to close friends, unless explicit permission has been granted.'
  },
  {
    id: 9,
    competency: 1,
    difficulty: 'hard',
    scenario: 'A client achieved remarkable results working with you and wants to write a detailed testimonial using specific examples from your sessions together.',
    question: 'How do you handle this ethically?',
    options: [
      'Accept the testimonial as written since they\'re offering it voluntarily',
      'Thank them and request they make it more general without specific details',
      'Discuss what level of detail they\'re comfortable sharing publicly, explain how testimonials might affect future clients\' expectations, and reach a mutual agreement',
      'Decline testimonials entirely to maintain privacy'
    ],
    correct: 2,
    explanation: 'Option C demonstrates ethical sophistication by ensuring informed consent - helping the client understand implications before they share. This protects both the client and potential future clients who might have different needs. Option A accepts without ensuring informed consent. Option B decides for them. Option D is unnecessarily restrictive.',
    insight: 'Even when clients volunteer information, ethical practice means ensuring they understand implications before sharing.'
  },
  {
    id: 10,
    competency: 1,
    difficulty: 'medium',
    scenario: 'You realize you have a personal bias against your client\'s lifestyle choices, and it\'s affecting your ability to remain fully present and non-judgmental.',
    question: 'What action demonstrates ethical responsibility?',
    options: [
      'Continue coaching and work on managing your bias',
      'Name your bias to the client and ask if they want to continue',
      'Refer them to another coach',
      'Discuss the situation in supervision, work on your bias with a therapist or coach, and make a decision about continuing based on whether you can serve this client effectively'
    ],
    correct: 3,
    explanation: 'Option D demonstrates comprehensive ethical responsibility by seeking support, working on personal development, and making a careful decision based on the client\'s best interest. Option A ignores the impact on the client. Option B burdens the client with managing the coach\'s issues. Option C might be premature without first attempting to address the bias.',
    insight: 'Ethical coaches recognize their biases, seek support to address them, and make decisions based on whether they can serve the client effectively.'
  },
  {
    id: 11,
    competency: 1,
    difficulty: 'hard',
    scenario: 'A prospective client wants to hire you because you share their religious background, saying "I only want to work with someone who shares my faith."',
    question: 'What response best addresses both ethics and client needs?',
    options: [
      'Agree to work with them since shared background can build trust',
      'Decline because coaching should be faith-neutral',
      'Explore what\'s important about shared faith, how it relates to their goals, discuss how you\'ll honor their values while maintaining coaching focus, and ensure they understand coaching isn\'t religious counseling',
      'Accept but clarify you won\'t provide religious guidance'
    ],
    correct: 2,
    explanation: 'Option C thoroughly explores the client\'s need while maintaining ethical boundaries about coaching\'s scope. It ensures the client understands what coaching is and isn\'t, while honoring their values. Option A assumes shared background is sufficient. Option B unnecessarily excludes a potential fit. Option D clarifies but doesn\'t fully explore the client\'s underlying needs.',
    insight: 'Ethical coaching explores client preferences while ensuring clear agreements about coaching scope and boundaries.'
  },
  {
    id: 12,
    competency: 1,
    difficulty: 'medium',
    scenario: 'Your coaching agreement states 24-hour cancellation notice, but a client cancels 6 hours before due to a family emergency.',
    question: 'What action best balances ethics and compassion?',
    options: [
      'Waive the fee given the emergency',
      'Charge the full fee per the agreement',
      'Acknowledge the difficult situation, review your policy, consider the circumstances, and make a decision that honors both your agreement and human compassion',
      'Charge half the fee as a compromise'
    ],
    correct: 2,
    explanation: 'Option C demonstrates ethical maturity by acknowledging all factors - the agreement made, the human circumstances, and the relationship trust. This allows for a thoughtful decision rather than rigid application. Option A might undermine clear agreements. Option B lacks compassion. Option D arbitrary splits the difference without thoughtful consideration.',
    insight: 'Ethics includes honoring agreements while also considering context and maintaining humanity in business relationships.'
  },

  // COMPETENCY 2: Embodies a Coaching Mindset (12 questions)
  {
    id: 13,
    competency: 2,
    difficulty: 'hard',
    scenario: 'Your client describes a conflict with a colleague, and you immediately recognize they\'re doing exactly what you did in a similar situation last year.',
    question: 'What response BEST embodies coaching mindset?',
    options: [
      'Share your similar experience to build rapport',
      'Notice your reaction, set it aside, and stay curious about their unique experience',
      'Ask if they\'d like to hear about a similar situation',
      'Use your experience to ask targeted questions'
    ],
    correct: 1,
    explanation: 'Coaching mindset means recognizing when your own experience is showing up and consciously returning to the client\'s world. Option B demonstrates this discipline. The other options all center the coach\'s experience rather than the client\'s. Even Option D, while well-intentioned, uses your experience as the framework rather than discovering the client\'s unique perspective.',
    insight: 'Coaching mindset requires actively noticing when you\'re projecting your own experience and consciously returning to curiosity about the client\'s reality.'
  },
  {
    id: 14,
    competency: 2,
    difficulty: 'medium',
    scenario: 'A client says "I think I just need to be more disciplined." You sense there\'s something deeper going on.',
    question: 'What question best embodies coaching mindset?',
    options: [
      'What would discipline look like for you?',
      'What\'s important about discipline?',
      'You said you need to be more disciplined - what are you noticing that makes you say that?',
      'What happens when you\'re not disciplined?'
    ],
    correct: 2,
    explanation: 'Option C embodies coaching mindset by helping the client examine their own thinking rather than accepting their initial frame. It invites them to notice what\'s underneath the word "discipline." Options A and D accept the frame. Option B explores meaning but doesn\'t help them examine the assumption itself.',
    insight: 'Coaching mindset includes gently challenging clients to examine their own conclusions and assumptions rather than accepting them at face value.'
  },
  {
    id: 15,
    competency: 2,
    difficulty: 'hard',
    scenario: 'Your client is a high achiever who keeps setting bigger goals before completing current ones. You find yourself feeling exhausted just listening to their pace.',
    question: 'How do you work with this while maintaining coaching mindset?',
    options: [
      'Suggest they slow down and complete current goals first',
      'Notice your own reaction, explore whether the pace feels sustainable to them, and trust their self-awareness',
      'Match their energy and help them plan for all the goals',
      'Ask what they might be avoiding by constantly moving forward'
    ],
    correct: 1,
    explanation: 'Option B demonstrates coaching mindset by noticing your own reaction (coaching mindset skill), then trusting the client\'s capacity for self-awareness rather than imposing your perspective. Option A is advice. Option C is complicity without reflection. Option D makes an assumption about what\'s driving the behavior.',
    insight: 'Coaching mindset means noticing your own reactions and using them as data, not as reasons to advise or assume.'
  },
  {
    id: 16,
    competency: 2,
    difficulty: 'medium',
    scenario: 'A client presents a problem you\'ve successfully solved in your own life. You\'re confident you know what they should do.',
    question: 'What internal process demonstrates coaching mindset?',
    options: [
      'Recognize your certainty as a signal to become more curious about their unique situation',
      'Share your solution but frame it as a possibility',
      'Store your solution in case it becomes relevant later',
      'Ask questions that lead them to your solution'
    ],
    correct: 0,
    explanation: 'Option A shows true coaching mindset - using the feeling of certainty as a signal to return to curiosity. The client\'s situation is never exactly like yours, and coaching mindset trusts their wisdom over your experience. Options B, C, and D all maintain the coach\'s agenda rather than truly embodying openness.',
    insight: 'In coaching mindset, the feeling of "knowing the answer" is a signal to become MORE curious, not to share or guide toward your solution.'
  },
  {
    id: 17,
    competency: 2,
    difficulty: 'hard',
    scenario: 'Your client describes a decision-making process that seems obviously flawed to you. They ask "What do you think I should do?"',
    question: 'What response MOST embodies coaching mindset?',
    options: [
      'I notice you\'re asking me to decide. What would it be like to trust yourself to figure this out?',
      'Point out the flaws you see in their process',
      'What do YOU think you should do?',
      'Ask questions to help them see the flaws'
    ],
    correct: 0,
    explanation: 'Option A embodies coaching mindset by naming what\'s happening (client deferring) and returning agency to them. It trusts their capability. Option B is consulting. Option C simply deflects. Option D maintains a hidden agenda of "helping them see the error" rather than genuine curiosity.',
    insight: 'Coaching mindset means believing the client is resourceful and capable, even when you see things they don\'t yet see.'
  },
  {
    id: 18,
    competency: 2,
    difficulty: 'medium',
    scenario: 'A client seems to be in denial about feedback they received. Your instinct is to help them face reality.',
    question: 'What approach embodies coaching mindset?',
    options: [
      'Directly point out what they\'re avoiding',
      'Trust that they\'re processing at their own pace, stay curious about what they\'re experiencing, and allow their awareness to unfold naturally',
      'Ask pointed questions to break through the denial',
      'Suggest they might be avoiding something'
    ],
    correct: 1,
    explanation: 'Option B embodies coaching mindset by trusting the client\'s timing and process rather than the coach\'s agenda for when they "should" see something. What looks like denial might be necessary processing time. Options A, C, and D all push the coach\'s timeline and agenda.',
    insight: 'Coaching mindset includes trusting the client\'s pace of awareness, even when you\'re impatient for them to "get it."'
  },
  {
    id: 19,
    competency: 2,
    difficulty: 'hard',
    scenario: 'You notice you\'re feeling protective of your client and wanting to save them from a decision you think will hurt them.',
    question: 'What internal work embodies coaching mindset?',
    options: [
      'Share your concern directly',
      'Notice the protective feeling, recognize it\'s about you not them, return to trusting their capability to handle consequences',
      'Ask questions to help them see potential downsides',
      'Stay silent but remain concerned'
    ],
    correct: 1,
    explanation: 'Option B demonstrates coaching mindset maturity - recognizing that protective feelings are about the coach, not the client, and returning to trust in the client\'s resilience and learning. Options A and C act on the protective feeling. Option D suppresses it without addressing it.',
    insight: 'Coaching mindset requires recognizing when our "helpful" impulses are actually about our own discomfort, not the client\'s needs.'
  },
  {
    id: 20,
    competency: 2,
    difficulty: 'medium',
    scenario: 'Your client is highly analytical and keeps processing everything intellectually. You notice you want them to access their emotions.',
    question: 'What demonstrates coaching mindset?',
    options: [
      'Ask "What are you feeling?" to invite emotion',
      'Notice your preference, recognize their analytical style is valid, and explore what\'s most useful for them',
      'Continue following their analytical process',
      'Invite them to notice what they\'re feeling in their body'
    ],
    correct: 1,
    explanation: 'Option B embodies coaching mindset by catching the coach\'s preference for emotional processing and honoring that the client\'s analytical approach is equally valid. It then explores what serves them. Options A and D impose the coach\'s process preference. Option C is passive following without examining what serves the client.',
    insight: 'Coaching mindset means recognizing your preferences about how clients "should" process and honoring that their way is valid.'
  },
  {
    id: 21,
    competency: 2,
    difficulty: 'hard',
    scenario: 'A client consistently doesn\'t follow through on actions they identify. You notice irritation rising in you.',
    question: 'What inner process best embodies coaching mindset?',
    options: [
      'Notice the irritation is yours, get curious about what\'s really happening for them, let go of attachment to their action-taking',
      'Address the pattern directly',
      'Stop suggesting actions and focus only on awareness',
      'Explore what\'s getting in the way of follow-through'
    ],
    correct: 0,
    explanation: 'Option A demonstrates coaching mindset at multiple levels - noticing your emotion as information about you, returning to curiosity, and releasing attachment to outcomes. Options B and D are reasonable approaches but don\'t address the coach\'s inner process. Option C makes an assumption about what would help.',
    insight: 'Coaching mindset recognizes that irritation with a client\'s "lack of progress" is always about the coach\'s attachment, not the client\'s failure.'
  },
  {
    id: 22,
    competency: 2,
    difficulty: 'medium',
    scenario: 'Your client describes a situation that triggers a strong memory of your own past experience. You feel pulled to share it.',
    question: 'What demonstrates coaching mindset?',
    options: [
      'Share briefly if it would help them',
      'Notice the pull to share, recognize it\'s your need not theirs, return full attention to their experience',
      'Ask if they\'d like to hear a related experience',
      'Use the memory to inform your questions'
    ],
    correct: 1,
    explanation: 'Option B shows coaching mindset discipline - recognizing that the pull to share your story is about your need (to connect, to be relevant, to help) not about what serves the client. All other options act on the impulse rather than examine it.',
    insight: 'The impulse to share your own story is usually about the coach\'s needs, not the client\'s. Coaching mindset means recognizing and releasing this impulse.'
  },
  {
    id: 23,
    competency: 2,
    difficulty: 'hard',
    scenario: 'A client says "I\'m just not a confident person." You strongly believe confidence is learnable, not fixed.',
    question: 'What response embodies coaching mindset?',
    options: [
      'Challenge their belief that confidence is fixed',
      'You say you\'re not a confident person - tell me about a time you felt confident about something',
      'Explore what they mean by confidence and how they came to this conclusion about themselves',
      'Share that confidence is a skill anyone can develop'
    ],
    correct: 2,
    explanation: 'Option C embodies coaching mindset by getting curious about the client\'s meaning and construction of identity rather than imposing the coach\'s belief system. Options A and D push the coach\'s worldview. Option B is good but assumes the coach\'s definition of confidence applies.',
    insight: 'Coaching mindset means staying curious about how the client constructs their reality, even when it conflicts with your beliefs about human potential.'
  },
  {
    id: 24,
    competency: 2,
    difficulty: 'medium',
    scenario: 'You notice you\'re trying to make the session "good" and are subtly steering toward an insight or breakthrough.',
    question: 'What demonstrates coaching mindset?',
    options: [
      'Continue but be more subtle about it',
      'Notice your agenda, name it to yourself, release it, and return to following the client',
      'Share with the client that you\'re feeling attached to them having a breakthrough',
      'Ask a powerful question to create the breakthrough'
    ],
    correct: 1,
    explanation: 'Option B demonstrates coaching mindset maturity - catching your own agenda, releasing it internally, and returning to genuine partnership. Option A continues the problem. Option C burdens the client with your needs. Option D intensifies the agenda rather than releasing it.',
    insight: 'Coaching mindset requires constantly catching and releasing your attachment to the session being "productive" or "good" by your standards.'
  },

  // COMPETENCY 3: Establishes and Maintains Agreements (13 questions)
  {
    id: 25,
    competency: 3,
    difficulty: 'hard',
    scenario: 'In your third session, your client suddenly says "I want to shift our focus entirely - the goal we set isn\'t what I really need to work on."',
    question: 'What response BEST maintains agreements while serving the client?',
    options: [
      'Great - what do you want to focus on instead?',
      'Let\'s explore what\'s changed since we set our original goal',
      'I\'m noticing we\'re three sessions into the goal we agreed to. Tell me more about this shift - what are you realizing? And then let\'s look at whether we need to revise our coaching agreement.',
      'Let\'s complete what we started, then move to the new focus'
    ],
    correct: 2,
    explanation: 'Option C properly maintains the agreement by acknowledging it exists, exploring the shift, and then explicitly addressing whether to revise the agreement. Option A abandons the agreement without discussion. Option B explores but doesn\'t address the agreement. Option D imposes rigidity.',
    insight: 'Maintaining agreements means acknowledging them when they\'re shifting and explicitly deciding together whether to revise, not just following new directions.'
  },
  {
    id: 26,
    competency: 3,
    difficulty: 'medium',
    scenario: 'You\'re 45 minutes into a scheduled hour session and your client introduces a completely new, significant topic.',
    question: 'How do you maintain agreements about session time?',
    options: [
      'Continue the conversation and go over time if needed',
      'Point out the time and suggest making it the focus of the next session',
      'I\'m noticing we have 15 minutes left and you\'re bringing up something that feels significant. What would be most useful - to begin exploring this now, or to make it our starting point next time?',
      'Ask a powerful question about the new topic'
    ],
    correct: 2,
    explanation: 'Option C maintains the time boundary while giving the client agency in how to use remaining time. It names what\'s happening and offers choice. Option A violates the time agreement. Option B decides for them. Option D ignores the time constraint.',
    insight: 'Maintaining time agreements means making the constraint visible and letting the client choose how to work within it.'
  },
  {
    id: 27,
    competency: 3,
    difficulty: 'hard',
    scenario: 'Your coaching agreement specifies monthly sessions, but your client hasn\'t scheduled anything in three months. They just emailed asking for an urgent session.',
    question: 'What response maintains agreements while supporting the client?',
    options: [
      'Schedule the urgent session immediately',
      'Remind them of the monthly agreement and ask them to honor it',
      'Respond acknowledging the urgent request, reflect that you haven\'t met in three months which is different from your agreement, explore what\'s happening, and then make a decision together about how to proceed',
      'Decline until they commit to the original schedule'
    ],
    correct: 2,
    explanation: 'Option C addresses the agreement violation directly while staying curious and collaborative. It doesn\'t punish (D) or ignore the situation (A), but surfaces it for discussion. Option B is too rigid. This demonstrates that agreements are living documents that can be examined and revised.',
    insight: 'When agreements are broken, name it directly and explore together rather than either ignoring it or rigidly enforcing it.'
  },
  {
    id: 28,
    competency: 3,
    difficulty: 'medium',
    scenario: 'At the start of a session, your client asks "Can we just have a conversation today? I don\'t want to focus on anything specific."',
    question: 'What maintains the coaching agreement?',
    options: [
      'Agree and have an unstructured conversation',
      'Of course - what would you like to talk about?',
      'I hear you want something different today. Let\'s be clear about what we\'re doing - are you wanting coaching with a lighter structure, or something else? What would make this time most valuable for you?',
      'Remind them that coaching is goal-focused'
    ],
    correct: 2,
    explanation: 'Option C maintains the coaching agreement by clarifying what the client is actually asking for and ensuring the session remains purposeful even if less structured. Options A and B might drift into non-coaching conversation. Option D is too rigid.',
    insight: 'Maintaining agreements means clarifying what\'s wanted when requests seem to shift from coaching, then re-contracting explicitly.'
  },
  {
    id: 29,
    competency: 3,
    difficulty: 'hard',
    scenario: 'Your client frequently brings their spouse problems to sessions, but your coaching agreement is focused on their leadership development.',
    question: 'How do you address this?',
    options: [
      'Follow where they want to go',
      'Redirect back to leadership topics',
      'I\'m noticing we\'re spending significant time on your relationship, and our coaching agreement is focused on your leadership development. These might be connected, or this might signal a need to revise our agreement. What are you noticing?',
      'Suggest they get a relationship coach'
    ],
    correct: 2,
    explanation: 'Option C explicitly surfaces the pattern and invites the client to reflect on whether the agreement needs revision. It honors both the original agreement and the client\'s emerging needs. Options A and B don\'t address the misalignment. Option D is premature.',
    insight: 'When patterns emerge that don\'t fit the agreement, name the pattern and explore whether to revise the agreement rather than just following or redirecting.'
  },
  {
    id: 30,
    competency: 3,
    difficulty: 'medium',
    scenario: 'A client wants to jump right into their issue, but you haven\'t completed your intake or established a coaching agreement.',
    question: 'What do you do?',
    options: [
      'Follow their urgency and address the intake later',
      'Insist on completing intake first',
      'I can feel your urgency to dive in. Before we do, I want us to spend 15 minutes ensuring we\'re aligned on how coaching works and what you want from our time together. This will actually make our work more effective. Does that work for you?',
      'Split the time between intake and their issue'
    ],
    correct: 2,
    explanation: 'Option C acknowledges their urgency, explains why the agreement matters, and gets their buy-in. This establishes the agreement while respecting their need. Option A risks confusion. Option B might feel dismissive. Option D compromises both.',
    insight: 'Establishing agreements sometimes means slowing down an urgent client, but with clear explanation of why it serves them.'
  },
  {
    id: 31,
    competency: 3,
    difficulty: 'hard',
    scenario: 'During a session, you realize the conversation has become more like therapy - processing historical trauma rather than forward-focused coaching.',
    question: 'How do you maintain agreements about the nature of coaching?',
    options: [
      'Continue if the client is benefiting',
      'Stop and refer them to therapy',
      'I want to pause here. I\'m noticing our conversation has moved into processing past trauma, which is really the domain of therapy, not coaching. Coaching is about moving forward. Can we acknowledge what\'s coming up for you and think together about what support you might need?',
      'Gently redirect to future-focused questions'
    ],
    correct: 2,
    explanation: 'Option C directly names what\'s happening and maintains the boundary between coaching and therapy while staying supportive. It doesn\'t just redirect (D) or abruptly refer (B), but addresses the boundary explicitly. Option A risks practicing outside scope.',
    insight: 'Maintaining agreements about what coaching is means directly naming when conversations move outside coaching scope and re-contracting.'
  },
  {
    id: 32,
    competency: 3,
    difficulty: 'medium',
    scenario: 'Your client consistently arrives 10-15 minutes late to sessions, leaving less time to work.',
    question: 'What maintains the time agreement?',
    options: [
      'Extend sessions to make up the time',
      'End at the scheduled time regardless',
      'After it happens twice: "I\'m noticing you\'ve arrived late to our last few sessions. Our agreement is to start at [time]. What\'s happening, and what do we need to adjust?"',
      'Say nothing but feel resentful'
    ],
    correct: 2,
    explanation: 'Option C addresses the pattern directly after establishing it\'s a pattern (not a one-time thing), states the agreement clearly, and invites problem-solving. Option A enables the pattern. Option B is rigid without discussion. Option D harms the relationship.',
    insight: 'When patterns violate agreements, name them explicitly and explore together rather than just accommodating or rigidly enforcing.'
  },
  {
    id: 33,
    competency: 3,
    difficulty: 'hard',
    scenario: 'In session 5, your client says "I thought coaching would be more like consulting - giving me advice. Can you do that?"',
    question: 'How do you maintain the coaching agreement?',
    options: [
      'Provide some advice to meet their need',
      'Firmly explain that coaching isn\'t consulting',
      'It sounds like there\'s a gap between what you expected and what you\'re experiencing. Let\'s talk about what you\'re looking for. I can share some thinking if that would help, but coaching is fundamentally about helping you access your own wisdom. Is that still what you want?',
      'Ask what specific advice they want'
    ],
    correct: 2,
    explanation: 'Option C addresses the mismatch directly, clarifies what coaching is, and checks if they want to continue. It allows for occasional sharing while maintaining the essential nature of coaching. Option A shifts to consulting. Option B might feel defensive. Option D could slide into advice-giving.',
    insight: 'When clients want something other than coaching, clarify what coaching is and isn\'t, then check if the partnership still makes sense.'
  },
  {
    id: 34,
    competency: 3,
    difficulty: 'medium',
    scenario: 'Your client says they want to achieve X, but their actions consistently move them toward Y. When you point this out, they say "I know, I know" but nothing changes.',
    question: 'What addresses the underlying agreement?',
    options: [
      'Continue coaching toward goal X',
      'Suggest they change their goal to Y',
      'I\'m noticing a pattern - you say you want X, but your actions consistently move toward Y. I\'m wondering if there\'s something we need to look at about what you actually want, or what might be in the way. What are you noticing?',
      'Accept that change is slow'
    ],
    correct: 2,
    explanation: 'Option C surfaces the misalignment between stated and revealed goals, inviting deeper exploration. This might reveal that the real goal is Y, or uncover obstacles to X. Options A and D ignore the misalignment. Option B assumes without exploring.',
    insight: 'When actions consistently contradict stated goals, the agreement itself may need examination - perhaps the stated goal isn\'t the real goal.'
  },
  {
    id: 35,
    competency: 3,
    difficulty: 'hard',
    scenario: 'You\'re coaching someone in an organization. They keep complaining about their boss but don\'t want to discuss it directly or take any action.',
    question: 'What maintains a productive coaching agreement?',
    options: [
      'Listen supportively to the venting',
      'Push them to take action',
      'I\'m noticing we spend a lot of our time on your boss, but you don\'t want to address it directly or make changes. I want to make sure our coaching time is useful. What do you actually want to work on? If the boss situation is central, how can we approach it productively?',
      'Suggest they find a new job'
    ],
    correct: 2,
    explanation: 'Option C directly addresses unproductive pattern and invites re-contracting around what\'s actually workable. It doesn\'t enable venting (A), push unwanted action (B), or offer solutions (D), but surfaces the impasse for the client to resolve.',
    insight: 'When sessions become unproductive, name the pattern explicitly and re-establish agreement about what the client actually wants to work on.'
  },
  {
    id: 36,
    competency: 3,
    difficulty: 'medium',
    scenario: 'At the end of your coaching engagement, your client asks to stay in touch as friends.',
    question: 'How do you maintain professional agreements?',
    options: [
      'Agree since the professional relationship is ending',
      'Decline to keep boundaries clear',
      'I appreciate that we\'ve built a strong connection. Let\'s talk about what friendship would mean and how it might affect our coaching relationship if you wanted to return. I want to be thoughtful about this. What\'s important to you about staying connected?',
      'Stay connected on LinkedIn only'
    ],
    correct: 2,
    explanation: 'Option C explores the request while surfacing important considerations about boundaries and future coaching. It allows for thoughtful decision-making rather than reflexive yes or no. Options A and B decide without discussion. Option D makes an arbitrary compromise.',
    insight: 'Even when formal agreements end, maintaining professionalism means thoughtfully discussing relationship changes and their implications.'
  },
  {
    id: 37,
    competency: 3,
    difficulty: 'hard',
    scenario: 'Your client frequently cancels sessions at the last minute, always with valid-sounding reasons. Your practice is suffering financially.',
    question: 'What maintains the coaching agreement?',
    options: [
      'Continue accommodating since the reasons are valid',
      'Implement a strict cancellation policy',
      'I want to address something. You\'ve cancelled our last four sessions, all understandably, but it\'s creating a pattern. For coaching to work, we need consistency. And honestly, these cancellations affect my practice. Can we talk about what\'s really happening and what commitment level works for both of us?',
      'End the coaching relationship'
    ],
    correct: 2,
    explanation: 'Option C addresses the pattern honestly, including the impact on the coach, and opens space for real dialogue about commitment. It\'s direct without being punitive. Option A enables dysfunction. Option B might feel punishing without discussion. Option D is premature.',
    insight: 'Maintaining agreements sometimes means honestly sharing the impact on you and exploring whether the current structure is working for both parties.'
  },

  // COMPETENCY 4: Cultivates Trust and Safety (13 questions)
  {
    id: 38,
    competency: 4,
    difficulty: 'hard',
    scenario: 'Your client is describing a decision they made that you privately think was a significant mistake with serious consequences.',
    question: 'What response BEST cultivates trust and safety?',
    options: [
      'Share your concern about the decision',
      'Ask questions to help them see the potential problems',
      'Tell me more about how you came to this decision',
      'Acknowledge the courage it took to make a difficult decision, then explore what they\'re learning'
    ],
    correct: 3,
    explanation: 'Option D cultivates trust by honoring their agency and choices first, creating safety to then explore learning. Options A and B introduce judgment that damages trust. Option C is neutral but doesn\'t actively build safety around what might be a vulnerable topic.',
    insight: 'Trust and safety come from honoring client choices even when you disagree, then creating space to explore learning without judgment.'
  },
  {
    id: 39,
    competency: 4,
    difficulty: 'medium',
    scenario: 'Your client shares something personal and vulnerable, then quickly says "Sorry, that\'s probably too much information."',
    question: 'What response cultivates trust and safety?',
    options: [
      'It\'s fine, continue',
      'Thank you for trusting me with that. There\'s no "too much" here. What made you want to share it?',
      'It\'s not too much - this is a safe space',
      'What makes you think it\'s too much?'
    ],
    correct: 1,
    explanation: 'Option B explicitly affirms the trust placed in you, normalizes vulnerability, and stays curious. This creates safety. Option C states it\'s safe but doesn\'t acknowledge the risk they took. Options A and D are more procedural.',
    insight: 'When clients show vulnerability, explicitly acknowledge it and affirm that the space can hold it - this deepens trust.'
  },
  {
    id: 40,
    competency: 4,
    difficulty: 'hard',
    scenario: 'Your client admits they lied to you in previous sessions about taking action they never took.',
    question: 'How do you respond to cultivate ongoing trust?',
    options: [
      'Thank you for telling me the truth now. I\'m curious what made it hard to be honest before, and what changed?',
      'Express disappointment that they lied',
      'Reassure them it\'s okay and move on',
      'Point out that coaching only works with honesty'
    ],
    correct: 0,
    explanation: 'Option A acknowledges the truth-telling (reinforcing it), stays curious about what created the dishonesty, and doesn\'t shame. This creates safety to be honest going forward. Option B damages trust. Option C minimizes. Option D lectures.',
    insight: 'When clients risk telling truth after dishonesty, honor that risk and explore what enabled the shift rather than focusing on the lie.'
  },
  {
    id: 41,
    competency: 4,
    difficulty: 'medium',
    scenario: 'A client who is usually very articulate is struggling to express something, starting and stopping several times.',
    question: 'What creates safety for them to find their words?',
    options: [
      'Take your time - there\'s no rush',
      'Try to help by suggesting what they might mean',
      'Stay present in silence, maybe say "I\'m right here" or "Take all the time you need"',
      'Ask a clarifying question to help them focus'
    ],
    correct: 2,
    explanation: 'Option C creates safety through patient presence and reassurance without pressure. The specific words offer connection while allowing struggle. Option A is good but slightly more clinical. Option B takes away their search. Option D interrupts the process.',
    insight: 'Sometimes trust and safety come from simply staying present with someone\'s struggle without trying to help or fix it.'
  },
  {
    id: 42,
    competency: 4,
    difficulty: 'hard',
    scenario: 'Your client makes a self-deprecating joke that seems to hide real pain or shame.',
    question: 'How do you respond in a way that creates safety to go deeper?',
    options: [
      'Laugh with them to ease tension',
      'You made that into a joke, and I\'m sensing something tender underneath. Would you be willing to talk about what\'s really there?',
      'Ask them to be serious',
      'Ignore the joke and ask about the content'
    ],
    correct: 1,
    explanation: 'Option B gently names what you observe, invites them deeper, and asks permission - creating safety to show vulnerability. Option A colludes with the defense. Options C and D are too direct without creating safety first.',
    insight: 'Creating safety sometimes means gently naming defenses and inviting someone to lower them, always with permission.'
  },
  {
    id: 43,
    competency: 4,
    difficulty: 'medium',
    scenario: 'Your client says "I don\'t know" to several of your questions in a row, and seems to be shutting down.',
    question: 'What cultivates safety and re-engagement?',
    options: [
      'Ask different questions',
      'I\'m noticing you\'re saying "I don\'t know" a lot. What\'s happening for you right now? Am I asking the wrong questions?',
      'Give them time to think',
      'Summarize what you\'ve heard so far'
    ],
    correct: 1,
    explanation: 'Option B names what\'s happening, checks in on their experience, and takes responsibility for the dynamic. This creates safety to re-engage. Options A and C continue without addressing the shift. Option D might feel like more pressure.',
    insight: 'When clients start shutting down, create safety by naming what\'s happening and inviting them to tell you what they need.'
  },
  {
    id: 44,
    competency: 4,
    difficulty: 'hard',
    scenario: 'Your client reveals they\'ve been receiving feedback that they\'re difficult to work with, and they seem deeply ashamed.',
    question: 'What response cultivates trust around this vulnerable topic?',
    options: [
      'That must be hard to hear',
      'What\'s it like to tell me this? I imagine that took courage, and I\'m glad you did. What do you make of the feedback?',
      'Feedback like that can be tough - how are you planning to address it?',
      'Everyone gets difficult feedback sometimes'
    ],
    correct: 1,
    explanation: 'Option B acknowledges the vulnerability of sharing, normalizes the courage it took, and then moves to exploration. This creates safety around shame. Option A shows empathy but is brief. Option C rushes to problem-solving. Option D minimizes.',
    insight: 'Around shame, creating safety means explicitly acknowledging the courage it takes to reveal something, before exploring the content.'
  },
  {
    id: 45,
    competency: 4,
    difficulty: 'medium',
    scenario: 'You make an observation about your client\'s pattern, and they become defensive.',
    question: 'How do you restore trust and safety?',
    options: [
      'Back off from the observation',
      'Apologize for the observation',
      'I notice my observation landed roughly. That wasn\'t my intent. Can you tell me what happened for you just then?',
      'Stand by your observation',
    ],
    correct: 2,
    explanation: 'Option C names the impact, clarifies intent, and invites them to share their experience - creating safety to repair and learn. Options A and B abandon potentially valuable work. Option D prioritizes being right over the relationship.',
    insight: 'When you impact trust negatively, name it directly, clarify intent, and invite dialogue about what happened - this restores safety.'
  },
  {
    id: 46,
    competency: 4,
    difficulty: 'hard',
    scenario: 'Your client shares something about their identity (race, sexuality, religion, etc.) and you notice yourself having a reaction or assumption.',
    question: 'What maintains trust and safety?',
    options: [
      'Share your reaction to be authentic',
      'Notice your reaction internally, set it aside, and stay present with curiosity about their experience',
      'Ask questions to understand their experience better',
      'Acknowledge you may not fully understand their experience'
    ],
    correct: 1,
    explanation: 'Option B maintains safety by managing your reactions internally while staying present. Sharing your reaction (A) centers you. Options C and D are okay but Option B is most fundamental - first manage yourself, then respond appropriately.',
    insight: 'Trust around identity requires managing your own reactions and assumptions internally first, then showing up with clean curiosity.'
  },
  {
    id: 47,
    competency: 4,
    difficulty: 'medium',
    scenario: 'Your client is highly successful but reveals deep imposter syndrome. They ask "Do you think I\'m actually good at what I do?"',
    question: 'What response cultivates trust while maintaining coaching?',
    options: [
      'Yes, absolutely - here\'s what I observe',
      'What do you think?',
      'What would it mean if I said yes? Or if I said no? I\'m curious what you\'re looking for in asking me this.',
      'You\'ve achieved remarkable things - what makes you doubt yourself?'
    ],
    correct: 2,
    explanation: 'Option C stays in coaching while honoring the vulnerability of the question. It explores what they\'re really asking rather than answering directly or deflecting. Options A and D offer perspective but remove agency. Option B feels dismissive of the vulnerability.',
    insight: 'When clients ask for your assessment, explore what they\'re really asking for rather than either giving or withholding your opinion.'
  },
  {
    id: 48,
    competency: 4,
    difficulty: 'hard',
    scenario: 'Your client describes treating someone poorly, and you feel judgment arising.',
    question: 'What maintains trust and safety?',
    options: [
      'Name your judgment to be transparent',
      'Notice your judgment, recognize it\'s yours not theirs, return to curiosity about what led to their behavior and what they\'re learning',
      'Ask what they think about how they behaved',
      'Explore the impact of their behavior'
    ],
    correct: 1,
    explanation: 'Option B manages your judgment internally while maintaining space for the client to reflect. Introducing your judgment (A) damages trust. Options C and D are reasonable but don\'t address managing your internal reaction, which is primary to maintaining safety.',
    insight: 'Trust requires managing your judgment internally rather than introducing it, even in the name of authenticity.'
  },
  {
    id: 49,
    competency: 4,
    difficulty: 'medium',
    scenario: 'Your client seems to be testing whether it\'s really safe to be honest by making a controversial statement and watching for your reaction.',
    question: 'What response builds trust?',
    options: [
      'Show no reaction',
      'I appreciate you being direct. I\'m curious what led you to this perspective.',
      'Agree or disagree with the statement',
      'Acknowledge it\'s a strong position'
    ],
    correct: 1,
    explanation: 'Option B explicitly appreciates the honesty (reinforcing it\'s safe), then shows curiosity without judgment. This passes the test. Option A might seem inauthentic. Option C makes it about agreement. Option D is more neutral than affirming.',
    insight: 'When clients test safety, explicitly appreciate their honesty and respond with curiosity rather than judgment or agreement.'
  },
  {
    id: 50,
    competency: 4,
    difficulty: 'hard',
    scenario: 'Your client becomes emotional during a session and apologizes for crying.',
    question: 'What response cultivates trust around emotions?',
    options: [
      'It\'s okay to cry',
      'There\'s nothing to apologize for. Your emotions are welcome here. Take all the time you need.',
      'Don\'t apologize - what are you feeling?',
      'Tears often come when something important is moving'
    ],
    correct: 1,
    explanation: 'Option B explicitly welcomes the emotion, removes shame, and creates space without pressure. It\'s both permissive and spacious. Option A is okay but brief. Option C moves too quickly to exploration. Option D intellectualizes.',
    insight: 'Creating safety around emotion means explicitly welcoming it and removing shame before any exploration.'
  },

  // COMPETENCY 5: Maintains Presence (12 questions)
  {
    id: 51,
    competency: 5,
    difficulty: 'hard',
    scenario: 'You notice your mind wandering during the session, thinking about your own problems.',
    question: 'What action demonstrates maintaining presence?',
    options: [
      'Force yourself to concentrate harder',
      'Apologize to the client for not being fully present',
      'Notice the wandering, acknowledge it internally, take a breath, and bring your full attention back to the client',
      'Ask the client to repeat what they said'
    ],
    correct: 2,
    explanation: 'Option C demonstrates the practice of presence - noticing when you\'ve left, returning without judgment, and re-engaging fully. Option A creates tension. Option B burdens the client. Option D focuses on content rather than restoring presence.',
    insight: 'Presence is a practice of noticing when attention drifts and gently returning, not forcing unbroken concentration.'
  },
  {
    id: 52,
    competency: 5,
    difficulty: 'medium',
    scenario: 'Your client is speaking and you realize you\'re already formulating your next question instead of truly listening.',
    question: 'How do you restore presence?',
    options: [
      'Make a note of your question for later and return attention to listening',
      'Ask your question when they finish',
      'Let go of the question entirely and listen with fresh attention to what they\'re actually saying',
      'Split your attention between listening and holding the question'
    ],
    correct: 2,
    explanation: 'Option C demonstrates true presence by releasing the planned question - the thing that pulled you away - and returning to fresh listening. Option A maintains divided attention. Option B acts on the question. Option D splits attention rather than restoring it.',
    insight: 'Maintaining presence often means releasing your agenda, including "good questions," to hear what\'s actually being said.'
  },
  {
    id: 53,
    competency: 5,
    difficulty: 'hard',
    scenario: 'Your client is telling a long, detailed story. You notice yourself getting impatient and wanting them to get to the point.',
    question: 'What demonstrates presence?',
    options: [
      'Ask "What\'s the key point here?"',
      'Notice your impatience as information about you, let it go, and return curiosity about why they\'re telling the story this way',
      'Wait patiently for them to finish',
      'Acknowledge your impatience to them'
    ],
    correct: 1,
    explanation: 'Option B demonstrates presence by using your impatience as data about yourself, releasing judgment, and getting curious about the client\'s process. This restores true presence. Option A interrupts. Option C is passive waiting, not active presence. Option D centers your experience.',
    insight: 'Presence means recognizing your impatience or judgment as information about you, then returning to curiosity about the client.'
  },
  {
    id: 54,
    competency: 5,
    difficulty: 'medium',
    scenario: 'You\'re coaching via video and the client\'s cat jumps on their lap, creating distraction.',
    question: 'How do you maintain presence with what\'s actually happening?',
    options: [
      'Ignore the cat and continue',
      'Comment briefly on the cat, smile, then return to the work',
      'Be present with the moment, perhaps name the interruption with lightness, and allow whatever needs to happen before naturally returning to the coaching',
      'Ask them to remove the cat'
    ],
    correct: 2,
    explanation: 'Option C demonstrates presence with what\'s actually happening rather than forcing it back to the agenda. Brief acknowledgment and allowing the moment before returning shows real presence. Options A and D ignore reality. Option B is good but slightly more formulaic.',
    insight: 'Presence means being with what\'s actually happening, including interruptions, rather than forcing attention back to "the work."'
  },
  {
    id: 55,
    competency: 5,
    difficulty: 'hard',
    scenario: 'Your client pauses mid-sentence and seems to lose their train of thought. Silence follows.',
    question: 'What demonstrates presence in this moment?',
    options: [
      'Help them by reminding them what they were saying',
      'Ask "Where did you go just then?"',
      'Stay present in the silence with curiosity and patience, allowing space for whatever is emerging',
      'Wait for them to continue'
    ],
    correct: 2,
    explanation: 'Option C demonstrates full presence - staying with them in the silence with genuine openness to whatever emerges. Option A removes their process. Option B might interrupt something forming. Option D is passive waiting rather than active presence.',
    insight: 'Presence in silence means maintaining connection and curiosity, not just waiting for words to resume.'
  },
  {
    id: 56,
    competency: 5,
    difficulty: 'medium',
    scenario: 'You notice you\'re feeling anxious about time running out before reaching a resolution.',
    question: 'What maintains presence?',
    options: [
      'Speed up the pace to reach resolution',
      'Notice the anxiety is yours, release attachment to resolution, trust the process',
      'Share the time pressure with the client',
      'Extend the session if needed'
    ],
    correct: 1,
    explanation: 'Option B demonstrates presence by recognizing the anxiety as yours and releasing the agenda for resolution. This restores genuine presence. Options A and D act on the anxiety. Option C might burden the client with your attachment.',
    insight: 'Presence requires releasing your attachment to outcomes, including resolution, and trusting the client\'s timing.'
  },
  {
    id: 57,
    competency: 5,
    difficulty: 'hard',
    scenario: 'Your client says something that triggers a strong memory from your own life, and you feel yourself pulled into your own story.',
    question: 'How do you maintain presence with the client?',
    options: [
      'Share your story briefly if relevant',
      'Notice you\'ve gone to your story, acknowledge it internally, and bring your full attention back to their experience',
      'Use the memory to inform your understanding',
      'Ask a question based on your experience'
    ],
    correct: 1,
    explanation: 'Option B demonstrates presence discipline - catching when you\'ve left their world for yours and consciously returning. All other options maintain some part of your agenda or story in the space.',
    insight: 'Presence means noticing when you\'ve gone to your own experience and actively returning to the client\'s world.'
  },
  {
    id: 58,
    competency: 5,
    difficulty: 'medium',
    scenario: 'Your client\'s energy is very flat and low. You notice yourself trying to bring energy to "liven things up."',
    question: 'What demonstrates presence?',
    options: [
      'Match their energy level',
      'Notice your impulse to change their energy, let it go, and be present with them as they are',
      'Gently increase your energy',
      'Name that their energy is low'
    ],
    correct: 1,
    explanation: 'Option B demonstrates presence by catching and releasing your agenda about how they "should" be, and instead being fully present with them as they are. Option A is mechanical matching. Options C and D act on your discomfort with their energy.',
    insight: 'Presence means being with the client exactly as they are, not as you want them to be.'
  },
  {
    id: 59,
    competency: 5,
    difficulty: 'hard',
    scenario: 'Your client is describing a success, and you notice yourself already thinking about "What\'s next?" or "How do you build on this?"',
    question: 'What maintains presence?',
    options: [
      'Ask your "what\'s next" question',
      'Celebrate the success first, then move to next steps',
      'Notice you\'ve jumped ahead, return fully to this moment, and simply be with their success without agenda',
      'Ask them what they want to do with this success'
    ],
    correct: 2,
    explanation: 'Option C demonstrates presence by catching the forward movement and returning to simply being with what is. True presence doesn\'t immediately leverage moments toward progress. Options A, B, and D maintain future focus rather than being present.',
    insight: 'Presence means staying with what is, including success, without immediately moving to leverage or next steps.'
  },
  {
    id: 60,
    competency: 5,
    difficulty: 'medium',
    scenario: 'You realize you\'re having a physical reaction - stomach tight, shoulders tense - while your client is speaking.',
    question: 'How does this physical awareness support presence?',
    options: [
      'Ignore it and focus on the client',
      'Notice it as information, briefly attend to it (maybe take a breath), then return attention to the client while staying aware of your body',
      'Ask the client about it',
      'Take a break to address it'
    ],
    correct: 1,
    explanation: 'Option B demonstrates embodied presence - using body awareness as information while maintaining attention on the client. The body reaction might signal something important being said. Option A splits attention. Options C and D center the coach\'s experience.',
    insight: 'Presence includes body awareness; physical reactions can signal important moments while attention stays with the client.'
  },
  {
    id: 61,
    competency: 5,
    difficulty: 'hard',
    scenario: 'Your client is speaking quickly and jumping between topics. You notice confusion arising.',
    question: 'What demonstrates presence with this confusion?',
    options: [
      'Ask them to slow down',
      'Try to track all the topics',
      'Notice the confusion as information, stay present with the experience of following them, and be curious about what\'s happening for them right now',
      'Summarize what you\'re hearing to check understanding'
    ],
    correct: 2,
    explanation: 'Option C demonstrates presence by staying with the actual experience (including confusion) and being curious about what\'s happening for them. The jumping might be significant. Option A controls their process. Option B creates pressure. Option D interrupts their flow.',
    insight: 'Presence includes staying with your experience (even confusion) as information about what the client might be experiencing.'
  },
  {
    id: 62,
    competency: 5,
    difficulty: 'medium',
    scenario: 'You planned a powerful question before the session based on your last conversation. Now the session is going somewhere different.',
    question: 'What maintains presence?',
    options: [
      'Ask your planned question anyway',
      'Find a moment to work in your question',
      'Completely let go of your planned question and be fully present with where they actually are',
      'Save the question for the end'
    ],
    correct: 2,
    explanation: 'Option C demonstrates presence by releasing pre-session agenda and being with what\'s actually happening. Attachment to your planned question pulls you out of presence. All other options maintain some attachment to your agenda.',
    insight: 'Presence requires releasing all pre-planned interventions to be with what\'s actually emerging in the moment.'
  },

  // COMPETENCY 6: Listens Actively (13 questions)
  {
    id: 63,
    competency: 6,
    difficulty: 'hard',
    scenario: 'Your client says "I\'m fine with the decision" but their voice is tight and their body language is closed.',
    question: 'What listening response is MOST aligned with the whole message?',
    options: [
      'What makes you feel fine about it?',
      'You say you\'re fine, and I\'m noticing your voice and body seem to be saying something different. What\'s true right now?',
      'Are you really fine with it?',
      'Tell me more about the decision'
    ],
    correct: 1,
    explanation: 'Option B demonstrates PCC-level listening by attending to multiple channels (words, tone, body) and naming the incongruence directly. This invites the client to access their fuller truth. Options A and D only respond to words. Option C challenges but doesn\'t name what you\'re observing.',
    insight: 'Active listening attends to the whole message - words, energy, tone, body language - and names incongruence directly.'
  },
  {
    id: 64,
    competency: 6,
    difficulty: 'medium',
    scenario: 'Your client uses the word "should" repeatedly: "I should do this," "I should feel that way."',
    question: 'What demonstrates listening to patterns?',
    options: [
      'Ask about each "should" as they arise',
      'I\'m noticing you\'ve used the word "should" several times. What happens when you replace "should" with "want to" or "choose to"?',
      'Mentally note the pattern',
      'Ask "According to whom?" each time they say "should"'
    ],
    correct: 1,
    explanation: 'Option B demonstrates pattern listening - noticing the repeated word, naming it, and inviting awareness of what\'s underneath. Option A interrupts flow. Option C doesn\'t act on the pattern. Option D becomes formulaic.',
    insight: 'Active listening includes noticing and naming patterns in language that reveal underlying beliefs or assumptions.'
  },
  {
    id: 65,
    competency: 6,
    difficulty: 'hard',
    scenario: 'Your client is telling a detailed story. You notice the emotional energy shifts when they mention a particular person.',
    question: 'What demonstrates deep listening?',
    options: [
      'Let them finish the full story first',
      'I want to pause here. Your energy shifted when you mentioned Sarah. What\'s happening?',
      'Ask questions about Sarah',
      'Make a note to return to Sarah later'
    ],
    correct: 1,
    explanation: 'Option B demonstrates listening to energy shifts, not just content. Naming the shift in the moment accesses what\'s alive. Option A misses the significance. Options C and D focus on content rather than the energetic signal.',
    insight: 'Active listening attends to energy shifts as signals of significance, often more telling than the content itself.'
  },
  {
    id: 66,
    competency: 6,
    difficulty: 'medium',
    scenario: 'Your client says "It\'s not that big a deal" while describing something that sounds quite significant.',
    question: 'What listening response explores the disconnect?',
    options: [
      'It sounds like it is a big deal',
      'Why do you think it\'s not a big deal?',
      'You\'re saying it\'s not a big deal. I\'m curious - how big a deal is it actually feeling to you?',
      'Tell me more about what happened'
    ],
    correct: 2,
    explanation: 'Option C names what they said while inviting them to check their actual experience. This demonstrates listening for the gap between what\'s said and what might be felt. Option A contradicts them. Option B challenges. Option D stays with content.',
    insight: 'Active listening notices when clients minimize their experience and invites them to check what they\'re actually feeling.'
  },
  {
    id: 67,
    competency: 6,
    difficulty: 'hard',
    scenario: 'Your client talks rapidly for several minutes. You realize you\'re tracking words but have lost the thread of meaning.',
    question: 'What demonstrates active listening?',
    options: [
      'Ask them to slow down',
      'Paraphrase what you heard',
      'I want to stop here. You\'ve shared a lot and I want to make sure I\'m really getting it. What\'s the most important thing you want me to understand?',
      'Let them continue and try to catch up'
    ],
    correct: 2,
    explanation: 'Option C demonstrates active listening by acknowledging you want to truly understand and inviting them to identify what matters most. This serves both clarity and depth. Options A and B might feel controlling. Option D abandons active engagement.',
    insight: 'Active listening sometimes means acknowledging when you\'re overwhelmed with content and inviting them to identify what matters most.'
  },
  {
    id: 68,
    competency: 6,
    difficulty: 'medium',
    scenario: 'Your client describes a situation using very general language: "things," "stuff," "whatever."',
    question: 'What listening response creates specificity?',
    options: [
      'Can you be more specific?',
      'You said "things" - what things specifically?',
      'I\'m noticing you\'re using words like "things" and "stuff." What exactly are you referring to?',
      'Try to interpret from context'
    ],
    correct: 2,
    explanation: 'Option C names the pattern of vague language and invites specificity without judgment. This demonstrates listening to language precision. Option A is direct but clinical. Option B is okay but singular. Option D assumes rather than invites clarity.',
    insight: 'Active listening notices vague language and invites specificity to help clients access clearer understanding.'
  },
  {
    id: 69,
    competency: 6,
    difficulty: 'hard',
    scenario: 'Your client mentions something briefly then moves on, but you sense it\'s significant.',
    question: 'What demonstrates listening to significance?',
    options: [
      'Let them continue and return to it later',
      'You just mentioned X and moved on quickly. Can we pause there? Something about how you said that makes me curious.',
      'Ask "Tell me more about X"',
      'Make a mental note about it'
    ],
    correct: 1,
    explanation: 'Option B demonstrates listening for significance - catching what\'s mentioned in passing and naming what made you curious. This goes beyond just content to process. Options A and D lose the moment. Option C is functional but doesn\'t name why you\'re stopping.',
    insight: 'Active listening catches what\'s said in passing and names what signals significance - tone, energy, or speed of moving past it.'
  },
  {
    id: 70,
    competency: 6,
    difficulty: 'medium',
    scenario: 'Your client describes their colleague as "difficult" multiple times.',
    question: 'What listening response explores their meaning?',
    options: [
      'What makes them difficult?',
      'You\'ve called them difficult a few times. What does difficult mean to you in this situation?',
      'Difficult how?',
      'That sounds frustrating'
    ],
    correct: 1,
    explanation: 'Option B demonstrates listening to language by noticing the repeated word and inviting the client to define their meaning, not assuming yours. Option A assumes you know what difficult means. Option C is similar to A. Option D validates but doesn\'t explore meaning.',
    insight: 'Active listening explores the client\'s meaning of words rather than assuming shared definition.'
  },
  {
    id: 71,
    competency: 6,
    difficulty: 'hard',
    scenario: 'Your client describes a tense conversation but is speaking in a detached, analytical way about their own emotions.',
    question: 'What listening invites fuller experience?',
    options: [
      'What were you feeling during this conversation?',
      'You\'re describing this in a very analytical way. What\'s it like to actually be in that moment right now as you\'re telling me about it?',
      'Try to feel what you were feeling then',
      'That sounds emotional'
    ],
    correct: 1,
    explanation: 'Option B names the mode of processing (analytical) and invites them into felt experience now. This demonstrates listening to how they\'re relating to the experience, not just the content. Options A and C are direct but don\'t name the pattern. Option D observes without inviting.',
    insight: 'Active listening notices when clients are narrating versus experiencing, and can invite them into fuller contact with their experience.'
  },
  {
    id: 72,
    competency: 6,
    difficulty: 'medium',
    scenario: 'Your client keeps saying "I think" before every statement about themselves.',
    question: 'What listening response addresses this pattern?',
    options: [
      'What do you know, rather than think?',
      'I notice you say "I think" before statements about yourself. What if you dropped "I think" - what would you say?',
      'Try starting sentences differently',
      'Ask each question without "I think"'
    ],
    correct: 1,
    explanation: 'Option B names the hedging pattern and invites them to speak more directly. This demonstrates listening for how language reveals confidence or certainty. Option A shifts to "know" which might feel too aggressive. Options C and D direct without exploring why.',
    insight: 'Active listening notices hedging language patterns and explores what happens when clients speak more directly.'
  },
  {
    id: 73,
    competency: 6,
    difficulty: 'hard',
    scenario: 'Your client tells you about their day in chronological detail, and you sense the facts matter less than something underneath.',
    question: 'What listening response moves to deeper meaning?',
    options: [
      'Thank you for sharing all that. What\'s the experience you\'re really wanting me to understand?',
      'What\'s the point of this story?',
      'How do you feel about all this?',
      'Continue listening to all details'
    ],
    correct: 0,
    explanation: 'Option A appreciates what they shared while inviting them to identify what matters most. This demonstrates listening for underlying meaning, not just content. Option B might feel dismissive. Option C assumes it\'s about feelings. Option D continues receiving facts.',
    insight: 'Active listening distinguishes between facts being shared and the experience or meaning underneath, and invites the latter.'
  },
  {
    id: 74,
    competency: 6,
    difficulty: 'medium',
    scenario: 'Your client uses a metaphor: "I feel like I\'m swimming upstream."',
    question: 'What demonstrates listening to metaphor?',
    options: [
      'Explore what they mean by swimming upstream',
      'Say back "Swimming upstream - tell me more about that image"',
      'Ask about the specific challenges',
      'You feel like you\'re swimming upstream. What\'s the water? What\'s upstream?'
    ],
    correct: 3,
    explanation: 'Option D demonstrates active listening to metaphor by exploring it fully rather than just acknowledging or interpreting it. Metaphors often hold richer meaning than literal translation. Options A and C move away from the metaphor too quickly. Option B acknowledges but doesn\'t explore.',
    insight: 'Active listening explores metaphors deeply rather than translating them to literal meaning, as metaphors often carry fuller truth.'
  },
  {
    id: 75,
    competency: 6,
    difficulty: 'hard',
    scenario: 'Your client speaks for 5 minutes without pause. At the end, you realize the most significant thing was said in the first 30 seconds.',
    question: 'What demonstrates active listening?',
    options: [
      'Reflect back the whole message',
      'I want to go back to something you said right at the start. You said [quote the significant thing]. Can we explore that?',
      'Ask about what they said at the end',
      'Ask what was most important in all they shared'
    ],
    correct: 1,
    explanation: 'Option B demonstrates listening for significance by catching what mattered most and bringing focus there. Active listening doesn\'t treat all content equally. Options A and C treat content linearly. Option D asks them to identify rather than offering what you heard.',
    insight: 'Active listening identifies what\'s most significant in a longer share and brings focus there, not treating all content equally.'
  },

  // COMPETENCY 7: Evokes Awareness (13 questions)
  {
    id: 76,
    competency: 7,
    difficulty: 'hard',
    scenario: 'Your client says "I can\'t" about multiple aspects of their situation: "I can\'t leave this job," "I can\'t have that conversation," "I can\'t change."',
    question: 'What question MOST powerfully evokes awareness?',
    options: [
      'What would need to be true for you to be able to?',
      'What happens if you replace "can\'t" with "won\'t"?',
      'What are you making "can\'t" mean?',
      'Can\'t, or choosing not to?'
    ],
    correct: 1,
    explanation: 'Option B powerfully shifts from perceived limitation (can\'t) to choice (won\'t), evoking immediate awareness of agency. Option A explores barriers. Option C is abstract. Option D makes the same shift but less powerfully.',
    insight: 'Powerful awareness questions shift the frame from limitation to choice, from external constraint to internal decision.'
  },
  {
    id: 77,
    competency: 7,
    difficulty: 'medium',
    scenario: 'Your client complains that others don\'t listen to them.',
    question: 'What question evokes their agency in this?',
    options: [
      'What would it be like if they did listen?',
      'When do you listen to yourself?',
      'Why don\'t they listen?',
      'What do you do when others don\'t listen?'
    ],
    correct: 1,
    explanation: 'Option B powerfully shifts from "them" to "you" and from literal listening to metaphorical, evoking awareness of self-relationship. Options A and D stay with the external situation. Option C explores reasons rather than awareness.',
    insight: 'Powerful awareness questions often shift from external to internal, from "them" to "you," revealing the client\'s role.'
  },
  {
    id: 78,
    competency: 7,
    difficulty: 'hard',
    scenario: 'Your client says "I\'m not ready" to do something important to their goal.',
    question: 'What question creates the most awareness?',
    options: [
      'What would make you ready?',
      'When will you be ready?',
      'What does "ready" look like for you?',
      'What\'s the cost of waiting to be ready?'
    ],
    correct: 3,
    explanation: 'Option D evokes awareness of the choice being made and its consequences, which often shifts perspective powerfully. Option A seeks a fix. Option B assumes future readiness. Option C explores the concept but less transformatively.',
    insight: 'Questions about cost or consequence often evoke deeper awareness than questions about how to achieve something.'
  },
  {
    id: 79,
    competency: 7,
    difficulty: 'medium',
    scenario: 'Your client wants to be more confident but keeps focusing on building external achievements first.',
    question: 'What question evokes awareness about this pattern?',
    options: [
      'What if confidence came first?',
      'What would change if you already felt confident?',
      'What\'s the relationship between confidence and achievement for you?',
      'Which is the prerequisite - confidence or achievement?'
    ],
    correct: 1,
    explanation: 'Option B invites them to imagine the future state as present, which can evoke powerful awareness about what they\'re waiting for. Option A is good but less specific. Option C explores intellectually. Option D is binary.',
    insight: 'Inviting clients to imagine the desired state as already present often evokes awareness about what they\'re waiting for.'
  },
  {
    id: 80,
    competency: 7,
    difficulty: 'hard',
    scenario: 'Your client realizes they\'re unhappy but keeps generating reasons why they should be happy.',
    question: 'What question cuts through this?',
    options: [
      'What if being unhappy is the truth right now?',
      'Why do you need to be happy?',
      'What are you protecting by insisting you should be happy?',
      'What becomes possible if you accept the unhappiness?'
    ],
    correct: 2,
    explanation: 'Option C evokes awareness about the defensive function of the "should be happy" narrative. It gets to what\'s underneath. Option A normalizes but doesn\'t explore. Option B might feel attacking. Option D assumes acceptance is the path.',
    insight: 'Powerful awareness questions explore what clients are protecting with their resistance or "should" narratives.'
  },
  {
    id: 81,
    competency: 7,
    difficulty: 'medium',
    scenario: 'Your client says they want work-life balance but describes working 70-hour weeks.',
    question: 'What question evokes awareness?',
    options: [
      'What do your actions reveal about what you actually want?',
      'Why do you work so much?',
      'What would balance look like?',
      'What\'s stopping you from having balance?'
    ],
    correct: 0,
    explanation: 'Option A powerfully invites them to read their behavior as data about their real priorities, not their stated ones. This often creates immediate awareness. Options B and D seek reasons. Option C explores the concept.',
    insight: 'Asking clients to read their behavior as data about what they actually want creates powerful awareness.'
  },
  {
    id: 82,
    competency: 7,
    difficulty: 'hard',
    scenario: 'Your client keeps saying "I have to" about everything in their life.',
    question: 'What question most powerfully evokes awareness?',
    options: [
      'What if you don\'t have to?',
      'What happens if you replace "have to" with "choose to"?',
      'Who says you have to?',
      'What are you getting from believing you have to?'
    ],
    correct: 3,
    explanation: 'Option D evokes awareness about the payoff of the victim stance, which is often more powerful than challenging the language. Options A and B challenge the frame. Option C seeks external authority.',
    insight: 'Powerful awareness questions explore the hidden payoffs or functions of limiting beliefs rather than just challenging them.'
  },
  {
    id: 83,
    competency: 7,
    difficulty: 'medium',
    scenario: 'Your client wants others to change but won\'t change themselves.',
    question: 'What question evokes awareness of this dynamic?',
    options: [
      'What if you changed first?',
      'What makes your change harder than theirs?',
      'What does it mean about you if you have to change?',
      'What stays the same if no one changes?'
    ],
    correct: 2,
    explanation: 'Option C explores the meaning they\'re making about change, which often reveals the core resistance. Options A and D are okay but more surface-level. Option B compares rather than explores meaning.',
    insight: 'Questions about what something means to the client often evoke deeper awareness than questions about what to do.'
  },
  {
    id: 84,
    competency: 7,
    difficulty: 'hard',
    scenario: 'Your client repeatedly says "I don\'t know" to reflective questions.',
    question: 'What question moves past this?',
    options: [
      'What would you say if you did know?',
      'What\'s important about not knowing?',
      'Guess',
      'What\'s the not-knowing protecting you from?'
    ],
    correct: 3,
    explanation: 'Option D explores what the "not knowing" is serving, which often creates breakthrough awareness. Option A is good but mechanical. Option B is intellectual. Option C dismisses the significance.',
    insight: 'When clients repeatedly say "I don\'t know," exploring what the not-knowing protects them from often creates awareness.'
  },
  {
    id: 85,
    competency: 7,
    difficulty: 'medium',
    scenario: 'Your client describes feeling stuck between two choices.',
    question: 'What question evokes the deepest awareness?',
    options: [
      'What would each choice give you?',
      'What would each choice cost you?',
      'What\'s the choice underneath the choice?',
      'Which feels more aligned?'
    ],
    correct: 2,
    explanation: 'Option C invites awareness that the surface choice often represents a deeper one (e.g., safety vs. growth). This is often more transformative than examining the surface options. Options A, B, and D explore the surface choices.',
    insight: 'The most powerful awareness comes from exploring the deeper choice underneath the surface dilemma.'
  },
  {
    id: 86,
    competency: 7,
    difficulty: 'hard',
    scenario: 'Your client wants to be authentic but censors themselves constantly.',
    question: 'What question evokes awareness most powerfully?',
    options: [
      'What are you protecting by not being authentic?',
      'What would happen if you were authentic?',
      'What does being inauthentic get you?',
      'Who taught you to censor yourself?'
    ],
    correct: 2,
    explanation: 'Option C explores the payoff of the current behavior, which often creates immediate awareness. Option A explores protection (similar). Option B explores risk. Option D goes historical rather than present.',
    insight: 'Questions about what current "negative" behavior gets the client often evoke more awareness than exploring what change would bring.'
  },
  {
    id: 87,
    competency: 7,
    difficulty: 'medium',
    scenario: 'Your client says they value family but works constantly and misses important events.',
    question: 'What question evokes awareness of the disconnect?',
    options: [
      'What do you actually value, based on your choices?',
      'What makes work more important than family?',
      'What would it take to prioritize family?',
      'How does this align with your values?'
    ],
    correct: 0,
    explanation: 'Option A invites them to read their behavior as evidence of their actual values, which often creates powerful awareness. Options B and C assume work is prioritized. Option D is softer but less direct.',
    insight: 'Asking clients to name their actual values based on their behavior creates more awareness than comparing behavior to stated values.'
  },
  {
    id: 88,
    competency: 7,
    difficulty: 'hard',
    scenario: 'Your client repeatedly sacrifices their needs for others and feels resentful.',
    question: 'What question creates the most awareness?',
    options: [
      'What permission do you need to put yourself first?',
      'What are you getting from this pattern of sacrifice?',
      'What would change if you prioritized yourself?',
      'Who taught you to sacrifice yourself?'
    ],
    correct: 1,
    explanation: 'Option B explores the hidden payoff (perhaps feeling needed, avoiding guilt, maintaining identity as selfless), creating deep awareness. Options A and C assume change is wanted. Option D goes historical.',
    insight: 'Exploring what clients get from patterns they claim to dislike often creates the deepest awareness.'
  },

  // COMPETENCY 8: Facilitates Client Growth (12 questions)
  {
    id: 89,
    competency: 8,
    difficulty: 'hard',
    scenario: 'Your client identifies an action step but you sense they won\'t follow through because it doesn\'t address the real issue.',
    question: 'What response BEST facilitates growth?',
    options: [
      'Support their action step',
      'Point out the real issue',
      'I\'m curious - this action you\'re identifying, how does it connect to what we\'ve been exploring about what\'s really holding you back?',
      'Ask what might get in the way'
    ],
    correct: 2,
    explanation: 'Option C facilitates growth by inviting them to see the connection (or disconnect) between their action and the deeper work, rather than just pointing it out. This builds their capacity to assess their own actions. Options A and D don\'t address the sensing. Option B tells rather than evokes.',
    insight: 'Facilitating growth means helping clients develop their own capacity to assess whether actions address root causes.'
  },
  {
    id: 90,
    competency: 8,
    difficulty: 'medium',
    scenario: 'Your client has achieved their initial goal but doesn\'t want to end coaching.',
    question: 'What question facilitates continued growth?',
    options: [
      'What else do you want to work on?',
      'Should we continue?',
      'You\'ve achieved what you came for. What\'s your awareness about wanting to continue?',
      'What\'s next for you?'
    ],
    correct: 2,
    explanation: 'Option C facilitates growth by inviting them to examine their own desire to continue, which might reveal new awareness about their development needs or dependency. Options A and D just find new content. Option B asks for a decision without exploration.',
    insight: 'Facilitating growth means helping clients examine their own process and motivations, not just finding new content to work on.'
  },
  {
    id: 91,
    competency: 8,
    difficulty: 'hard',
    scenario: 'Your client keeps bringing surface-level problems rather than going deeper.',
    question: 'How do you facilitate deeper work?',
    options: [
      'Tell them they\'re avoiding depth',
      'Keep working on surface problems',
      'I\'m noticing we\'re addressing a series of individual situations. I\'m wondering what these situations might have in common, or what deeper theme they might be pointing to?',
      'Ask "What\'s really going on?"'
    ],
    correct: 2,
    explanation: 'Option C facilitates growth by inviting them to notice patterns and themes, developing their capacity for deeper reflection. Option A tells. Option B enables superficiality. Option D might feel too direct.',
    insight: 'Facilitating growth means helping clients develop the capacity to identify patterns and themes, not just solve individual problems.'
  },
  {
    id: 92,
    competency: 8,
    difficulty: 'medium',
    scenario: 'Your client identifies a learning edge but then intellectualizes it rather than doing anything.',
    question: 'What facilitates movement from insight to action?',
    options: [
      'Ask what they\'re going to do about it',
      'This insight feels important. What\'s one small experiment that would help you learn about this in real life?',
      'Point out they\'re intellectualizing',
      'Ask how they\'ll apply this'
    ],
    correct: 1,
    explanation: 'Option B facilitates growth by inviting experimentation - a small, low-risk way to move from insight to embodied learning. The word "experiment" removes pressure. Options A and D are standard but less specific. Option C just names without facilitating.',
    insight: 'Facilitating growth means helping clients design small experiments that move insights from intellectual to embodied.'
  },
  {
    id: 93,
    competency: 8,
    difficulty: 'hard',
    scenario: 'Your client has a breakthrough awareness but you sense they\'ll lose it by next session.',
    question: 'What helps integrate the awareness?',
    options: [
      'Remind them to remember it',
      'What will help you hold onto this awareness when you\'re back in your daily life?',
      'Schedule the next session soon',
      'Suggest they journal about it'
    ],
    correct: 1,
    explanation: 'Option B facilitates growth by helping them develop their own integration practices. It invites them to think about sustaining change. Options A and D provide answers. Option C uses logistics rather than developing capacity.',
    insight: 'Facilitating growth means helping clients develop their own practices for integrating insights, not just providing practices.'
  },
  {
    id: 94,
    competency: 8,
    difficulty: 'medium',
    scenario: 'Your client is facing a challenge that mirrors the work you\'ve done together, but doesn\'t recognize it.',
    question: 'How do you facilitate their learning?',
    options: [
      'Point out the connection',
      'This situation sounds familiar. Where have you encountered something like this before, maybe even in our work together?',
      'Remind them of previous learning',
      'Ask how they want to handle it'
    ],
    correct: 1,
    explanation: 'Option B facilitates growth by inviting them to make the connection themselves, which deepens learning and builds pattern recognition. Option A tells them. Option C reminds but doesn\'t facilitate recognition. Option D misses the learning opportunity.',
    insight: 'Facilitating growth means helping clients develop the ability to recognize patterns across contexts, not just pointing them out.'
  },
  {
    id: 95,
    competency: 8,
    difficulty: 'hard',
    scenario: 'Your client expresses frustration that they keep facing the same issue.',
    question: 'What response facilitates the most growth?',
    options: [
      'Empathize with the frustration',
      'You keep facing this same issue. What does that tell you?',
      'Help them solve it this time',
      'Explore why it keeps happening'
    ],
    correct: 1,
    explanation: 'Option B facilitates growth by inviting them to read the pattern as information about something they need to learn or change. This develops meta-awareness. Option A validates but doesn\'t facilitate growth. Options C and D focus on content rather than learning.',
    insight: 'Facilitating growth means helping clients see recurring patterns as curriculum, not just problems to solve.'
  },
  {
    id: 96,
    competency: 8,
    difficulty: 'medium',
    scenario: 'Your client identifies what they need to do but says "I already know this."',
    question: 'What question facilitates growth?',
    options: [
      'Then why aren\'t you doing it?',
      'Knowing and doing are different. What\'s the gap for you?',
      'What would help you do it?',
      'What makes it hard to act on?'
    ],
    correct: 1,
    explanation: 'Option B facilitates growth by acknowledging the knowing-doing gap and inviting exploration of it. This develops awareness about what gets in the way of applying knowledge. Option A might feel attacking. Options C and D are solution-focused.',
    insight: 'Facilitating growth means helping clients explore the gap between knowing and doing, not just finding solutions.'
  },
  {
    id: 97,
    competency: 8,
    difficulty: 'hard',
    scenario: 'Your client wants you to tell them what to do in a difficult situation.',
    question: 'What response facilitates their growth?',
    options: [
      'Decline and stay in coaching',
      'I could share some thoughts, but I\'m more curious - what do you think you should do? And what makes you want me to decide?',
      'Share what you think',
      'Ask what they would advise a friend'
    ],
    correct: 1,
    explanation: 'Option B facilitates growth at two levels: returning agency to them and exploring the pattern of looking outside themselves. Option A maintains boundaries but misses the learning. Option C gives advice. Option D is a technique but doesn\'t explore the pattern.',
    insight: 'Facilitating growth means using moments when clients want answers from you to explore their pattern of looking outside themselves.'
  },
  {
    id: 98,
    competency: 8,
    difficulty: 'medium',
    scenario: 'Your client has tried something new and it didn\'t work out.',
    question: 'What question facilitates learning from this?',
    options: [
      'What went wrong?',
      'What did you learn?',
      'What did this experience teach you about yourself?',
      'Will you try again?'
    ],
    correct: 2,
    explanation: 'Option C facilitates growth by focusing on self-knowledge gained, which is often more valuable than learning about the situation. Option A focuses on failure. Option B is good but more general. Option D moves to next action.',
    insight: 'Facilitating growth means helping clients mine experiences for self-knowledge, not just situational learning.'
  },
  {
    id: 99,
    competency: 8,
    difficulty: 'hard',
    scenario: 'Your client achieved a goal quickly and attributes it to luck or circumstances.',
    question: 'What facilitates growth from this success?',
    options: [
      'Celebrate the achievement',
      'Point out it wasn\'t luck',
      'You\'re calling it luck. What did you actually do that contributed to this?',
      'Affirm their competence'
    ],
    correct: 2,
    explanation: 'Option C facilitates growth by inviting them to claim their agency and see their contribution, building self-efficacy. Options A and D are supportive but don\'t facilitate learning. Option B tells rather than invites exploration.',
    insight: 'Facilitating growth means helping clients claim their agency in success, not letting them attribute it to external factors.'
  },
  {
    id: 100,
    competency: 8,
    difficulty: 'medium',
    scenario: 'As coaching nears its end, your client worries they won\'t sustain their growth.',
    question: 'What facilitates sustainable growth?',
    options: [
      'Reassure them they will',
      'Offer to continue coaching',
      'What\'s different about you now compared to when we started? What capacities have you developed?',
      'Create an action plan for maintaining growth'
    ],
    correct: 2,
    explanation: 'Option C facilitates sustainable growth by helping them recognize their developed capacities, building confidence in their ability to continue. Option A offers false reassurance. Option B creates dependency. Option D is tactical but doesn\'t build internal confidence.',
    insight: 'Facilitating sustainable growth means helping clients recognize the capacities they\'ve developed, not just the changes they\'ve made.'
  }
];

const COMPETENCY_NAMES = {
  1: 'Demonstrates Ethical Practice',
  2: 'Embodies a Coaching Mindset',
  3: 'Establishes and Maintains Agreements',
  4: 'Cultivates Trust and Safety',
  5: 'Maintains Presence',
  6: 'Listens Actively',
  7: 'Evokes Awareness',
  8: 'Facilitates Client Growth'
};

const COMPETENCY_COLORS = {
  1: '#f97316', // orange
  2: '#ec4899', // pink
  3: '#fbbf24', // amber
  4: '#10b981', // emerald
  5: '#8b5cf6', // purple
  6: '#06b6d4', // cyan
  7: '#f43f5e', // rose
  8: '#3b82f6'  // blue
};

function App() {
  const [view, setView] = useState('landing'); // landing, purchase, practice, exam, study, analytics, bookmarks
  const [isPurchased, setIsPurchased] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [bookmarks, setBookmarks] = useState(new Set());
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [examStartTime, setExamStartTime] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem('pcc-mastery-state');
    if (saved) {
      const state = JSON.parse(saved);
      setIsPurchased(state.isPurchased || false);
      setAnswers(state.answers || {});
      setBookmarks(new Set(state.bookmarks || []));
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('pcc-mastery-state', JSON.stringify({
      isPurchased,
      answers,
      bookmarks: Array.from(bookmarks)
    }));
  }, [isPurchased, answers, bookmarks]);

  const handlePurchase = async () => {
    // In production, this would call your Stripe checkout
    // For now, just simulate purchase
    setIsPurchased(true);
    setView('practice');
  };

  const startExam = () => {
    // Generate 155 questions for full exam simulation
    const examQ = [];
    for (let i = 0; i < 155; i++) {
      examQ.push(QUESTIONS[i % QUESTIONS.length]);
    }
    setExamQuestions(examQ);
    setExamStartTime(Date.now());
    setCurrentQuestion(0);
    setView('exam');
  };

  const startPractice = (competency = null) => {
    setSelectedCompetency(competency);
    setCurrentQuestion(0);
    setView('practice');
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const toggleBookmark = (questionId) => {
    setBookmarks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getFilteredQuestions = () => {
    if (view === 'exam') return examQuestions;
    if (view === 'bookmarks') {
      return QUESTIONS.filter(q => bookmarks.has(q.id));
    }
    if (selectedCompetency) {
      return QUESTIONS.filter(q => q.competency === selectedCompetency);
    }
    return QUESTIONS;
  };

  const calculateStats = () => {
    const total = Object.keys(answers).length;
    const correct = Object.entries(answers).filter(([qId, ans]) => {
      const question = QUESTIONS.find(q => q.id === parseInt(qId));
      return question && question.correct === ans;
    }).length;

    const byCompetency = {};
    Object.entries(answers).forEach(([qId, ans]) => {
      const question = QUESTIONS.find(q => q.id === parseInt(qId));
      if (!question) return;
      
      if (!byCompetency[question.competency]) {
        byCompetency[question.competency] = { correct: 0, total: 0 };
      }
      byCompetency[question.competency].total++;
      if (question.correct === ans) {
        byCompetency[question.competency].correct++;
      }
    });

    return { total, correct, percentage: total > 0 ? Math.round((correct / total) * 100) : 0, byCompetency };
  };

  if (view === 'landing') {
    return (
      <LandingPage onGetStarted={() => setView(isPurchased ? 'practice' : 'purchase')} />
    );
  }

  if (view === 'purchase' && !isPurchased) {
    return (
      <PurchasePage onPurchase={handlePurchase} onBack={() => setView('landing')} />
    );
  }

  if (view === 'analytics') {
    const stats = calculateStats();
    return <AnalyticsView stats={stats} onBack={() => setView('practice')} />;
  }

  const questions = getFilteredQuestions();
  const question = questions[currentQuestion];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
      color: '#cbd5e1',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f97316, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            PCC Mastery
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setView('practice')} style={{
              padding: '0.5rem 1rem',
              background: view === 'practice' ? '#334155' : 'transparent',
              border: '1px solid #475569',
              borderRadius: '0.5rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Home size={18} /> Practice
            </button>
            
            <button onClick={startExam} style={{
              padding: '0.5rem 1rem',
              background: view === 'exam' ? '#334155' : 'transparent',
              border: '1px solid #475569',
              borderRadius: '0.5rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Clock size={18} /> Full Exam
            </button>
            
            <button onClick={() => setView('analytics')} style={{
              padding: '0.5rem 1rem',
              background: view === 'analytics' ? '#334155' : 'transparent',
              border: '1px solid #475569',
              borderRadius: '0.5rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <BarChart3 size={18} /> Analytics
            </button>

            <button onClick={() => setView('bookmarks')} style={{
              padding: '0.5rem 1rem',
              background: view === 'bookmarks' ? '#334155' : 'transparent',
              border: '1px solid #475569',
              borderRadius: '0.5rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <BookMarked size={18} /> Bookmarks ({bookmarks.size})
            </button>
          </div>
        </div>

        {view === 'practice' && !question && (
          <PracticeMenu onSelectCompetency={startPractice} questionCount={QUESTIONS.length} />
        )}

        {question && (
          <QuestionView
            question={question}
            currentIndex={currentQuestion}
            total={questions.length}
            onAnswer={handleAnswer}
            onNext={() => setCurrentQuestion(Math.min(currentQuestion + 1, questions.length - 1))}
            onPrev={() => setCurrentQuestion(Math.max(currentQuestion - 1, 0))}
            onBookmark={toggleBookmark}
            isBookmarked={bookmarks.has(question.id)}
            userAnswer={answers[question.id]}
            competencyName={COMPETENCY_NAMES[question.competency]}
            competencyColor={COMPETENCY_COLORS[question.competency]}
          />
        )}
      </div>
    </div>
  );
}

// Landing Page Component
function LandingPage({ onGetStarted }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #f97316, #ec4899, #f43f5e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          PCC Mastery
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: '#94a3b8',
          marginBottom: '3rem'
        }}>
          Master Your PCC Exam with Questions That Actually Challenge You
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <FeatureCard
            icon={<Brain size={32} />}
            title="100+ Questions"
            description="PCC-level difficulty"
            color="#f97316"
          />
          <FeatureCard
            icon={<Clock size={32} />}
            title="Full Exam Sim"
            description="3-hour timed practice"
            color="#ec4899"
          />
          <FeatureCard
            icon={<BarChart3 size={32} />}
            title="Analytics"
            description="Track by competency"
            color="#f43f5e"
          />
          <FeatureCard
            icon={<Target size={32} />}
            title="Detailed Insights"
            description="Deep explanations"
            color="#3b82f6"
          />
        </div>

        <button onClick={onGetStarted} style={{
          padding: '1rem 3rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #f97316, #ec4899)',
          border: 'none',
          borderRadius: '0.75rem',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <div style={{
      padding: '2rem',
      background: '#1e293b',
      borderRadius: '1rem',
      border: `1px solid ${color}20`,
      boxShadow: `0 4px 20px ${color}20`
    }}>
      <div style={{ color: color, marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ color: '#e2e8f0', marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ color: '#94a3b8' }}>{description}</p>
    </div>
  );
}

// Purchase Page
function PurchasePage({ onPurchase, onBack }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        background: '#1e293b',
        padding: '3rem',
        borderRadius: '1rem',
        border: '1px solid #334155',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#e2e8f0',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          Unlock PCC Mastery
        </h2>

        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #f97316, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          $39.99
        </div>

        <ul style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '2' }}>
          <li>✓ 100+ PCC-level practice questions</li>
          <li>✓ Full exam simulation (155 questions, 3 hours)</li>
          <li>✓ Detailed explanations + deeper insights</li>
          <li>✓ Performance analytics by competency</li>
          <li>✓ Bookmark and review system</li>
          <li>✓ Lifetime access + future updates</li>
        </ul>

        <button onClick={onPurchase} style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #f97316, #ec4899)',
          border: 'none',
          borderRadius: '0.75rem',
          color: 'white',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}>
          <Lock size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Purchase Now
        </button>

        <button onClick={onBack} style={{
          width: '100%',
          padding: '0.75rem',
          background: 'transparent',
          border: '1px solid #475569',
          borderRadius: '0.5rem',
          color: '#94a3b8',
          cursor: 'pointer'
        }}>
          Back
        </button>
      </div>
    </div>
  );
}

// Practice Menu
function PracticeMenu({ onSelectCompetency, questionCount }) {
  return (
    <div>
      <h2 style={{
        fontSize: '2rem',
        color: '#e2e8f0',
        marginBottom: '2rem'
      }}>
        Choose Practice Mode
      </h2>

      <div style={{
        display: 'grid',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <CompetencyButton
          competency={null}
          name="All Questions"
          color="#64748b"
          count={questionCount}
          onClick={onSelectCompetency}
        />
        
        {Object.entries(COMPETENCY_NAMES).map(([id, name]) => (
          <CompetencyButton
            key={id}
            competency={parseInt(id)}
            name={name}
            color={COMPETENCY_COLORS[id]}
            count={QUESTIONS.filter(q => q.competency === parseInt(id)).length}
            onClick={onSelectCompetency}
          />
        ))}
      </div>
    </div>
  );
}

function CompetencyButton({ competency, name, color, count, onClick }) {
  return (
    <button
      onClick={() => onClick(competency)}
      style={{
        padding: '1.5rem',
        background: '#1e293b',
        border: `2px solid ${color}40`,
        borderRadius: '0.75rem',
        color: '#e2e8f0',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s',
        boxShadow: `0 4px 15px ${color}20`
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <span style={{ fontSize: '1.125rem' }}>{name}</span>
      <span style={{
        background: color,
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 'bold'
      }}>
        {count} questions
      </span>
    </button>
  );
}

// Question View
function QuestionView({
  question,
  currentIndex,
  total,
  onAnswer,
  onNext,
  onPrev,
  onBookmark,
  isBookmarked,
  userAnswer,
  competencyName,
  competencyColor
}) {
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === question.correct;

  return (
    <div>
      {/* Progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <span style={{ color: '#94a3b8' }}>
          Question {currentIndex + 1} of {total}
        </span>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{
            background: `${competencyColor}20`,
            color: competencyColor,
            padding: '0.25rem 0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            border: `1px solid ${competencyColor}40`
          }}>
            {competencyName}
          </span>
          
          <span style={{
            background: question.difficulty === 'hard' ? '#dc262630' : '#fbbf2430',
            color: question.difficulty === 'hard' ? '#fca5a5' : '#fbbf24',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            border: `1px solid ${question.difficulty === 'hard' ? '#dc262640' : '#fbbf2440'}`
          }}>
            {question.difficulty}
          </span>

          <button
            onClick={() => onBookmark(question.id)}
            style={{
              background: isBookmarked ? '#f9731620' : 'transparent',
              border: `1px solid ${isBookmarked ? '#f97316' : '#475569'}`,
              borderRadius: '0.5rem',
              padding: '0.5rem',
              color: isBookmarked ? '#f97316' : '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <BookMarked size={18} fill={isBookmarked ? '#f97316' : 'none'} />
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div style={{
        background: '#1e293b',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid #334155',
        marginBottom: '2rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        {/* Scenario */}
        <div style={{
          background: '#0f172a',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginBottom: '1.5rem',
          border: '1px solid #1e293b'
        }}>
          <h3 style={{
            color: '#94a3b8',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            Scenario
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.125rem' }}>
            {question.scenario}
          </p>
        </div>

        {/* Question */}
        <h3 style={{
          color: '#e2e8f0',
          fontSize: '1.25rem',
          marginBottom: '1.5rem',
          fontWeight: '600'
        }}>
          {question.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {question.options.map((option, index) => {
            const isSelected = userAnswer === index;
            const isCorrectOption = index === question.correct;
            const showCorrect = isAnswered && isCorrectOption;
            const showIncorrect = isAnswered && isSelected && !isCorrectOption;

            return (
              <button
                key={index}
                onClick={() => !isAnswered && onAnswer(question.id, index)}
                disabled={isAnswered}
                style={{
                  padding: '1.25rem',
                  background: showCorrect ? '#10b98130' : showIncorrect ? '#dc262630' : isSelected ? '#33415550' : '#0f172a',
                  border: `2px solid ${showCorrect ? '#10b981' : showIncorrect ? '#dc2626' : isSelected ? '#475569' : '#1e293b'}`,
                  borderRadius: '0.75rem',
                  color: '#e2e8f0',
                  cursor: isAnswered ? 'default' : 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'start',
                  gap: '1rem',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!isAnswered) {
                    e.currentTarget.style.borderColor = competencyColor;
                    e.currentTarget.style.background = '#334155';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isAnswered && !isSelected) {
                    e.currentTarget.style.borderColor = '#1e293b';
                    e.currentTarget.style.background = '#0f172a';
                  }
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '2rem',
                  height: '2rem',
                  background: showCorrect ? '#10b981' : showIncorrect ? '#dc2626' : '#1e293b',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  {showCorrect ? <CheckCircle2 size={20} /> : showIncorrect ? <XCircle size={20} /> : String.fromCharCode(65 + index)}
                </span>
                <span style={{ flex: 1, lineHeight: '1.6' }}>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: isCorrect ? '#10b98115' : '#dc262615',
            border: `1px solid ${isCorrect ? '#10b98130' : '#dc262630'}`,
            borderRadius: '0.75rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              color: isCorrect ? '#10b981' : '#f87171',
              fontSize: '1.125rem',
              fontWeight: 'bold'
            }}>
              {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              {isCorrect ? 'Correct!' : 'Not quite'}
            </div>
            
            <div style={{
              color: '#cbd5e1',
              lineHeight: '1.7',
              marginBottom: '1rem'
            }}>
              <strong style={{ color: '#e2e8f0' }}>Explanation:</strong> {question.explanation}
            </div>

            <div style={{
              color: '#94a3b8',
              lineHeight: '1.7',
              paddingTop: '1rem',
              borderTop: '1px solid #334155'
            }}>
              <strong style={{ color: '#cbd5e1' }}>💡 Deeper Insight:</strong> {question.insight}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          style={{
            padding: '0.75rem 1.5rem',
            background: currentIndex === 0 ? '#1e293b' : '#334155',
            border: '1px solid #475569',
            borderRadius: '0.5rem',
            color: currentIndex === 0 ? '#64748b' : '#e2e8f0',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <ChevronLeft size={20} /> Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === total - 1}
          style={{
            padding: '0.75rem 1.5rem',
            background: currentIndex === total - 1 ? '#1e293b' : 'linear-gradient(135deg, #f97316, #ec4899)',
            border: 'none',
            borderRadius: '0.5rem',
            color: currentIndex === total - 1 ? '#64748b' : 'white',
            cursor: currentIndex === total - 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 'bold'
          }}
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// Analytics View
function AnalyticsView({ stats, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{
        padding: '0.5rem 1rem',
        background: 'transparent',
        border: '1px solid #475569',
        borderRadius: '0.5rem',
        color: '#cbd5e1',
        cursor: 'pointer',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <ChevronLeft size={18} /> Back
      </button>

      <h2 style={{
        fontSize: '2rem',
        color: '#e2e8f0',
        marginBottom: '2rem'
      }}>
        Performance Analytics
      </h2>

      {/* Overall Stats */}
      <div style={{
        background: '#1e293b',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid #334155',
        marginBottom: '2rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f97316, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stats.percentage}%
            </div>
            <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Overall Score</div>
          </div>
          
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#10b981'
            }}>
              {stats.correct}
            </div>
            <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Correct</div>
          </div>
          
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#94a3b8'
            }}>
              {stats.total}
            </div>
            <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Total Answered</div>
          </div>
        </div>
      </div>

      {/* By Competency */}
      <h3 style={{
        fontSize: '1.5rem',
        color: '#e2e8f0',
        marginBottom: '1rem'
      }}>
        Performance by Competency
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.entries(stats.byCompetency).map(([competency, data]) => {
          const percentage = Math.round((data.correct / data.total) * 100);
          const color = COMPETENCY_COLORS[competency];
          
          return (
            <div
              key={competency}
              style={{
                background: '#1e293b',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: `1px solid ${color}40`,
                boxShadow: `0 4px 15px ${color}20`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ color: '#e2e8f0', fontSize: '1.125rem' }}>
                  {COMPETENCY_NAMES[competency]}
                </span>
                <span style={{ color: '#94a3b8' }}>
                  {data.correct}/{data.total} ({percentage}%)
                </span>
              </div>
              
              <div style={{
                width: '100%',
                height: '0.75rem',
                background: '#0f172a',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: color,
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
