PGDMP  
    9                }           smart_habit_tracker    17.4    17.4 E    	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16611    smart_habit_tracker    DATABASE     y   CREATE DATABASE smart_habit_tracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pl-PL';
 #   DROP DATABASE smart_habit_tracker;
                     postgres    false                        2615    16612    habit_tracker    SCHEMA        CREATE SCHEMA habit_tracker;
    DROP SCHEMA habit_tracker;
                     postgres    false            �            1259    16665    activity    TABLE     �   CREATE TABLE habit_tracker.activity (
    activity_id bigint NOT NULL,
    user_id integer NOT NULL,
    thought_id integer NOT NULL,
    habit_tracker_detail_id integer NOT NULL,
    activity_date date NOT NULL
);
 #   DROP TABLE habit_tracker.activity;
       habit_tracker         heap r       postgres    false    6            �            1259    16664    activity_activity_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.activity_activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE habit_tracker.activity_activity_id_seq;
       habit_tracker               postgres    false    233    6                       0    0    activity_activity_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE habit_tracker.activity_activity_id_seq OWNED BY habit_tracker.activity.activity_id;
          habit_tracker               postgres    false    232            �            1259    16642    answer    TABLE     q   CREATE TABLE habit_tracker.answer (
    answer_id bigint NOT NULL,
    answer character varying(255) NOT NULL
);
 !   DROP TABLE habit_tracker.answer;
       habit_tracker         heap r       postgres    false    6            �            1259    16641    answer_answer_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.answer_answer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE habit_tracker.answer_answer_id_seq;
       habit_tracker               postgres    false    227    6                       0    0    answer_answer_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE habit_tracker.answer_answer_id_seq OWNED BY habit_tracker.answer.answer_id;
          habit_tracker               postgres    false    226            �            1259    16614    habit    TABLE     s   CREATE TABLE habit_tracker.habit (
    habit_id bigint NOT NULL,
    habit_name character varying(255) NOT NULL
);
     DROP TABLE habit_tracker.habit;
       habit_tracker         heap r       postgres    false    6            �            1259    16613    habit_habit_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_habit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE habit_tracker.habit_habit_id_seq;
       habit_tracker               postgres    false    6    219                       0    0    habit_habit_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE habit_tracker.habit_habit_id_seq OWNED BY habit_tracker.habit.habit_id;
          habit_tracker               postgres    false    218            �            1259    16621    habit_tracker    TABLE     �   CREATE TABLE habit_tracker.habit_tracker (
    habit_tracker_id bigint NOT NULL,
    habit_id integer NOT NULL,
    duration interval(3) NOT NULL,
    habit_tracker_detail_id integer NOT NULL
);
 (   DROP TABLE habit_tracker.habit_tracker;
       habit_tracker         heap r       postgres    false    6            �            1259    16620 "   habit_tracker_habit_tracker_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq;
       habit_tracker               postgres    false    221    6                       0    0 "   habit_tracker_habit_tracker_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq OWNED BY habit_tracker.habit_tracker.habit_tracker_id;
          habit_tracker               postgres    false    220            �            1259    16628    mood    TABLE     k   CREATE TABLE habit_tracker.mood (
    mood_id bigint NOT NULL,
    mood character varying(255) NOT NULL
);
    DROP TABLE habit_tracker.mood;
       habit_tracker         heap r       postgres    false    6            �            1259    16627    mood_mood_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.mood_mood_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.mood_mood_id_seq;
       habit_tracker               postgres    false    223    6                       0    0    mood_mood_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE habit_tracker.mood_mood_id_seq OWNED BY habit_tracker.mood.mood_id;
          habit_tracker               postgres    false    222            �            1259    16635    question    TABLE     w   CREATE TABLE habit_tracker.question (
    question_id bigint NOT NULL,
    question character varying(255) NOT NULL
);
 #   DROP TABLE habit_tracker.question;
       habit_tracker         heap r       postgres    false    6            �            1259    16634    question_question_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.question_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE habit_tracker.question_question_id_seq;
       habit_tracker               postgres    false    6    225                       0    0    question_question_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE habit_tracker.question_question_id_seq OWNED BY habit_tracker.question.question_id;
          habit_tracker               postgres    false    224            �            1259    16649    thought    TABLE     �   CREATE TABLE habit_tracker.thought (
    thought_id bigint NOT NULL,
    question_id integer NOT NULL,
    answer_id integer NOT NULL,
    mood_id integer NOT NULL
);
 "   DROP TABLE habit_tracker.thought;
       habit_tracker         heap r       postgres    false    6            �            1259    16648    thought_thought_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.thought_thought_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE habit_tracker.thought_thought_id_seq;
       habit_tracker               postgres    false    229    6                       0    0    thought_thought_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE habit_tracker.thought_thought_id_seq OWNED BY habit_tracker.thought.thought_id;
          habit_tracker               postgres    false    228            �            1259    16656    user    TABLE       CREATE TABLE habit_tracker."user" (
    user_id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    date_join date NOT NULL
);
 !   DROP TABLE habit_tracker."user";
       habit_tracker         heap r       postgres    false    6            �            1259    16655    user_user_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.user_user_id_seq;
       habit_tracker               postgres    false    6    231                       0    0    user_user_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE habit_tracker.user_user_id_seq OWNED BY habit_tracker."user".user_id;
          habit_tracker               postgres    false    230            L           2604    16668    activity activity_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.activity ALTER COLUMN activity_id SET DEFAULT nextval('habit_tracker.activity_activity_id_seq'::regclass);
 J   ALTER TABLE habit_tracker.activity ALTER COLUMN activity_id DROP DEFAULT;
       habit_tracker               postgres    false    232    233    233            I           2604    16645    answer answer_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.answer ALTER COLUMN answer_id SET DEFAULT nextval('habit_tracker.answer_answer_id_seq'::regclass);
 F   ALTER TABLE habit_tracker.answer ALTER COLUMN answer_id DROP DEFAULT;
       habit_tracker               postgres    false    226    227    227            E           2604    16617    habit habit_id    DEFAULT     ~   ALTER TABLE ONLY habit_tracker.habit ALTER COLUMN habit_id SET DEFAULT nextval('habit_tracker.habit_habit_id_seq'::regclass);
 D   ALTER TABLE habit_tracker.habit ALTER COLUMN habit_id DROP DEFAULT;
       habit_tracker               postgres    false    218    219    219            F           2604    16624    habit_tracker habit_tracker_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.habit_tracker ALTER COLUMN habit_tracker_id SET DEFAULT nextval('habit_tracker.habit_tracker_habit_tracker_id_seq'::regclass);
 T   ALTER TABLE habit_tracker.habit_tracker ALTER COLUMN habit_tracker_id DROP DEFAULT;
       habit_tracker               postgres    false    220    221    221            G           2604    16631    mood mood_id    DEFAULT     z   ALTER TABLE ONLY habit_tracker.mood ALTER COLUMN mood_id SET DEFAULT nextval('habit_tracker.mood_mood_id_seq'::regclass);
 B   ALTER TABLE habit_tracker.mood ALTER COLUMN mood_id DROP DEFAULT;
       habit_tracker               postgres    false    223    222    223            H           2604    16638    question question_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.question ALTER COLUMN question_id SET DEFAULT nextval('habit_tracker.question_question_id_seq'::regclass);
 J   ALTER TABLE habit_tracker.question ALTER COLUMN question_id DROP DEFAULT;
       habit_tracker               postgres    false    225    224    225            J           2604    16652    thought thought_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.thought ALTER COLUMN thought_id SET DEFAULT nextval('habit_tracker.thought_thought_id_seq'::regclass);
 H   ALTER TABLE habit_tracker.thought ALTER COLUMN thought_id DROP DEFAULT;
       habit_tracker               postgres    false    229    228    229            K           2604    16659    user user_id    DEFAULT     |   ALTER TABLE ONLY habit_tracker."user" ALTER COLUMN user_id SET DEFAULT nextval('habit_tracker.user_user_id_seq'::regclass);
 D   ALTER TABLE habit_tracker."user" ALTER COLUMN user_id DROP DEFAULT;
       habit_tracker               postgres    false    231    230    231                      0    16665    activity 
   TABLE DATA           s   COPY habit_tracker.activity (activity_id, user_id, thought_id, habit_tracker_detail_id, activity_date) FROM stdin;
    habit_tracker               postgres    false    233   �T                  0    16642    answer 
   TABLE DATA           :   COPY habit_tracker.answer (answer_id, answer) FROM stdin;
    habit_tracker               postgres    false    227   �T       �          0    16614    habit 
   TABLE DATA           <   COPY habit_tracker.habit (habit_id, habit_name) FROM stdin;
    habit_tracker               postgres    false    219   �T       �          0    16621    habit_tracker 
   TABLE DATA           m   COPY habit_tracker.habit_tracker (habit_tracker_id, habit_id, duration, habit_tracker_detail_id) FROM stdin;
    habit_tracker               postgres    false    221   U       �          0    16628    mood 
   TABLE DATA           4   COPY habit_tracker.mood (mood_id, mood) FROM stdin;
    habit_tracker               postgres    false    223   >U       �          0    16635    question 
   TABLE DATA           @   COPY habit_tracker.question (question_id, question) FROM stdin;
    habit_tracker               postgres    false    225   bU                 0    16649    thought 
   TABLE DATA           U   COPY habit_tracker.thought (thought_id, question_id, answer_id, mood_id) FROM stdin;
    habit_tracker               postgres    false    229   BZ                 0    16656    user 
   TABLE DATA           h   COPY habit_tracker."user" (user_id, first_name, last_name, email, password_hash, date_join) FROM stdin;
    habit_tracker               postgres    false    231   dZ                  0    0    activity_activity_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('habit_tracker.activity_activity_id_seq', 1, false);
          habit_tracker               postgres    false    232                       0    0    answer_answer_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('habit_tracker.answer_answer_id_seq', 1, false);
          habit_tracker               postgres    false    226                       0    0    habit_habit_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('habit_tracker.habit_habit_id_seq', 1, false);
          habit_tracker               postgres    false    218                       0    0 "   habit_tracker_habit_tracker_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('habit_tracker.habit_tracker_habit_tracker_id_seq', 1, false);
          habit_tracker               postgres    false    220                       0    0    mood_mood_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.mood_mood_id_seq', 1, false);
          habit_tracker               postgres    false    222                       0    0    question_question_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('habit_tracker.question_question_id_seq', 57, true);
          habit_tracker               postgres    false    224                       0    0    thought_thought_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('habit_tracker.thought_thought_id_seq', 1, true);
          habit_tracker               postgres    false    228                       0    0    user_user_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.user_user_id_seq', 32, true);
          habit_tracker               postgres    false    230            \           2606    16670    activity activity_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (activity_id);
 G   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_pkey;
       habit_tracker                 postgres    false    233            V           2606    16647    answer answer_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY habit_tracker.answer
    ADD CONSTRAINT answer_pkey PRIMARY KEY (answer_id);
 C   ALTER TABLE ONLY habit_tracker.answer DROP CONSTRAINT answer_pkey;
       habit_tracker                 postgres    false    227            N           2606    16619    habit habit_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY habit_tracker.habit
    ADD CONSTRAINT habit_pkey PRIMARY KEY (habit_id);
 A   ALTER TABLE ONLY habit_tracker.habit DROP CONSTRAINT habit_pkey;
       habit_tracker                 postgres    false    219            ^           2606    16672     activity habit_tracker_detail_id 
   CONSTRAINT     u   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT habit_tracker_detail_id UNIQUE (habit_tracker_detail_id);
 Q   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT habit_tracker_detail_id;
       habit_tracker                 postgres    false    233            P           2606    16626     habit_tracker habit_tracker_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY habit_tracker.habit_tracker
    ADD CONSTRAINT habit_tracker_pkey PRIMARY KEY (habit_tracker_id);
 Q   ALTER TABLE ONLY habit_tracker.habit_tracker DROP CONSTRAINT habit_tracker_pkey;
       habit_tracker                 postgres    false    221            R           2606    16633    mood mood_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY habit_tracker.mood
    ADD CONSTRAINT mood_pkey PRIMARY KEY (mood_id);
 ?   ALTER TABLE ONLY habit_tracker.mood DROP CONSTRAINT mood_pkey;
       habit_tracker                 postgres    false    223            T           2606    16640    question question_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY habit_tracker.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);
 G   ALTER TABLE ONLY habit_tracker.question DROP CONSTRAINT question_pkey;
       habit_tracker                 postgres    false    225            X           2606    16654    thought thought_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY habit_tracker.thought
    ADD CONSTRAINT thought_pkey PRIMARY KEY (thought_id);
 E   ALTER TABLE ONLY habit_tracker.thought DROP CONSTRAINT thought_pkey;
       habit_tracker                 postgres    false    229            Z           2606    16663    user user_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY habit_tracker."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);
 A   ALTER TABLE ONLY habit_tracker."user" DROP CONSTRAINT user_pkey;
       habit_tracker                 postgres    false    231            a           2606    16683    thought answer_id    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.thought
    ADD CONSTRAINT answer_id FOREIGN KEY (answer_id) REFERENCES habit_tracker.answer(answer_id) NOT VALID;
 B   ALTER TABLE ONLY habit_tracker.thought DROP CONSTRAINT answer_id;
       habit_tracker               postgres    false    4694    227    229            _           2606    16673    habit_tracker habit_id    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_tracker
    ADD CONSTRAINT habit_id FOREIGN KEY (habit_id) REFERENCES habit_tracker.habit(habit_id) ON DELETE CASCADE NOT VALID;
 G   ALTER TABLE ONLY habit_tracker.habit_tracker DROP CONSTRAINT habit_id;
       habit_tracker               postgres    false    4686    221    219            `           2606    16678 %   habit_tracker habit_tracker_detail_id    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_tracker
    ADD CONSTRAINT habit_tracker_detail_id FOREIGN KEY (habit_tracker_detail_id) REFERENCES habit_tracker.activity(habit_tracker_detail_id) ON DELETE CASCADE NOT VALID;
 V   ALTER TABLE ONLY habit_tracker.habit_tracker DROP CONSTRAINT habit_tracker_detail_id;
       habit_tracker               postgres    false    233    4702    221            b           2606    16693    thought mood_id    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.thought
    ADD CONSTRAINT mood_id FOREIGN KEY (mood_id) REFERENCES habit_tracker.mood(mood_id) NOT VALID;
 @   ALTER TABLE ONLY habit_tracker.thought DROP CONSTRAINT mood_id;
       habit_tracker               postgres    false    229    4690    223            c           2606    16688    thought question_id    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.thought
    ADD CONSTRAINT question_id FOREIGN KEY (question_id) REFERENCES habit_tracker.question(question_id) NOT VALID;
 D   ALTER TABLE ONLY habit_tracker.thought DROP CONSTRAINT question_id;
       habit_tracker               postgres    false    229    4692    225            d           2606    16703    activity thought_id    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT thought_id FOREIGN KEY (thought_id) REFERENCES habit_tracker.thought(thought_id) ON DELETE CASCADE NOT VALID;
 D   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT thought_id;
       habit_tracker               postgres    false    229    233    4696            e           2606    16698    activity user_id    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES habit_tracker."user"(user_id) ON DELETE CASCADE NOT VALID;
 A   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT user_id;
       habit_tracker               postgres    false    4698    233    231                  x�3�4C##S]]#3�=... ,(�             x�3�t�+.O-����� �]      �      x�3��HL�,����� ��      �      x�3�4�40�!#NC�=... !�      �      x�3����O����� �|      �   �  x��VK��8]ç����ϟ�+UY�'��lh	�K�����r����r�y�d��݋l\. �� &����Z�v�B똕�US��A�-;�[�����Awꢻ3��*�t�4^�ǳ�geՙ�����g��n*�FX䔿��R���Um�=w5ҁ���_T��o�di�fi��-2�®i=��%jBh���z�iڠ{ݯ6�yK�۞�Tm�
U��8|د����0ȗ���?�m���NLyS	�i��T�/���<�`�ũ��+%�������o�P2s����)_���P�`hU�"��\[d�����ݱ���%w2'�\����ؗ�Y�=���)�g����Wa_)F%��*ӏ�=<D�޼)Af˺�<֔�?��y�7��������v��;k+��᦮Zj�Rr'�}�%`P�.a5�F��� 	^;Jv��i�X��Si�WJ��ꃀ�L\���JרּӃ�,r�G{ri	%��v�ti�?��e��)�'��WZzh<� Xغ�eNi��ԩ����;ĸ���l���PPZ<���4�T����c��!���Ϛ���>e����&
d2_�>�PzoԘ{ec���.�.v7���)~K���sB� ����?��Q��'�.��p�����у�Gcܛ�R*������$HIV<\�=�Y&#��ʒI����������YJكV�s]���U;�C�=��03��lqk�ڟ'�sY��>�,��0��0���G����]��R�!-5%�5e�S�N8�s�P���'��]m�Z���R�]�<x]�(�=ڻ��>�&��b��n��+�����X�a@�XD��������HK0��<�<y������c� !D�q���)�����L�i!�EiyFy�`J��'���:0`�|1��;�k4�b�ӈfE��`XP^<	fq������L��P�b^S���-�|Sq\��ip���|C9x=�r��l�'�M�e�/`�*�#X���[�c�����ԞW١s�����Ԏ�ݔ~���X�uo���(^�x۪���i����'�'T��oSc�dЊ{�K{���G���v�8�T��3F?;L����5�W���l�>��ԸsՈ��l�/���~�/ȩx���L��x�>)O�b�- �,������0kk*��,�'0��1���8�Mپ$2��޸i��W��V���zm�            x�3�4A�=... ��         �   x���=��0�g�.��q��Rg8 ���ZD��܍{�@����:��>�qR�m�`��~�[�sHf5���~]���d9/�d��V`�`�B�J�Pi�Z+`�6���B���2R7!fxeId
(�^	���"�) D���Yd����'N&�bF��3?�5�l�<�,+��̑x�dǱ����R�$�$Q�/�$� jhB�;.n�Z���z&����	ޗ���?�0�M(.A>Ϊ����<)�(:�/�,��'VN     