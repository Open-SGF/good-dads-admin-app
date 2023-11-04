import type { Schema, Attribute } from '@strapi/strapi';

export interface QuizQuizQuestion extends Schema.Component {
  collectionName: 'components_quiz_quiz_questions';
  info: {
    displayName: 'Quiz Question';
    icon: 'question';
  };
  attributes: {
    Question: Attribute.Text & Attribute.Required & Attribute.Unique;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'quiz.quiz-question': QuizQuizQuestion;
    }
  }
}
