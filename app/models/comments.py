from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    comment = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime,default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user = db.relationship('User',  back_populates='comment')
    post = db.relationship('Post', back_populates='comment')
    # like = db.relationship('Like', back_populates='comment', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username if self.user else None,
            'post_id': self.post_id,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
