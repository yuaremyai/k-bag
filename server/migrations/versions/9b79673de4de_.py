"""empty message

Revision ID: 9b79673de4de
Revises: 8c499e661eae
Create Date: 2022-10-13 12:00:09.214618

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b79673de4de'
down_revision = '8c499e661eae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('cart_product_id_fkey', 'cart', type_='foreignkey')
    op.drop_constraint('cart_user_id_fkey', 'cart', type_='foreignkey')
    op.create_foreign_key(None, 'cart', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'cart', 'products', ['product_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('tokens_user_id_fkey', 'tokens', type_='foreignkey')
    op.create_foreign_key(None, 'tokens', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tokens', type_='foreignkey')
    op.create_foreign_key('tokens_user_id_fkey', 'tokens', 'users', ['user_id'], ['id'])
    op.drop_constraint(None, 'cart', type_='foreignkey')
    op.drop_constraint(None, 'cart', type_='foreignkey')
    op.create_foreign_key('cart_user_id_fkey', 'cart', 'users', ['user_id'], ['id'])
    op.create_foreign_key('cart_product_id_fkey', 'cart', 'products', ['product_id'], ['id'])
    # ### end Alembic commands ###
